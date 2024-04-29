import { singleton } from 'tsyringe';
import { Role } from '../data-access/models/role.model';
import { User } from '../data-access/models/user.model';
import { RoleRepository } from '../data-access/repositories/role.repository';
import { UserRepository } from '../data-access/repositories/user.repository';
import { AccessControlReq } from '../dto/role.dto';
import { AddUserRes, DeleteUserRes, DetailedUserData, GetUserRes, GetUsersReq, GetUsersRes, UpdateUserRes, UserReq, UsersData } from '../dto/user.dto';
import { HttpException } from '../middleware/error.middleware';
import { logger } from '../utils/logger';
import { sendEmail } from '../utils/mailer';
import { environment } from '../config/environment';

@singleton()
export class UserService {
    constructor(private readonly roleRepository: RoleRepository, private readonly userRepository: UserRepository) { }

    public async addUser(accountType: string, req: UserReq): Promise<AddUserRes> {
        const foundRole: Role | null = await this.roleRepository.findById(req.roleId);
        if (!foundRole) {
            throw new HttpException(404, 'RoleNotFound');
        }

        const existingEmail: User | null = await this.userRepository.findByEmail(accountType, req.emailAddress.toLowerCase());
        if (existingEmail) {
            throw new HttpException(409, 'EmailAlreadyExists');
        }

        const existingPhone: User | null = await this.userRepository.findByPhone(accountType, req.phoneNumber);
        if (existingPhone) {
            throw new HttpException(409, 'PhoneAlreadyExists');
        }

        const user: User | null = await this.userRepository.add(accountType, {
            roleId: req.roleId,
            firstName: req.firstName,
            middleName: req.middleName,
            lastName: req.lastName,
            avatar: req.avatar,
            cover: req.cover,
            emailAddress: req.emailAddress,
            phoneNumber: req.phoneNumber,
            dateOfBirth: req.dateOfBirth,
            gender: req.gender,
            citizenship: req.citizenship,
            countryCode: req.countryCode,
            stateId: req.stateId,
            cityId: req.cityId,
            addressLine: req.addressLine,
            postalCode: req.postalCode
        }, foundRole.accessControl as AccessControlReq);
        if (!user) {
            logger.error(`Failed to add user | accountType: ${accountType}, request body: ${req}`);
            throw new HttpException(500, 'SomethingWentWrong');
        }

        const emailIsSent: boolean = await sendEmail(
            environment.brevoAccessAdminPortalTid,
            user.email.address,
            'Welcome to the admin portal!',
            {
                firstName: user.personal.firstName,
                link: `${environment.adminPortalUrl}/reset-password?token=${user.email.passwordReset?.token}`,
                year: new Date().getFullYear()
            }
        );

        return {
            data: {
                success: user != null && emailIsSent,
                userId: user._id!
            },
            errors: [],
            warnings: []
        };
    }

    public async getUsers(req: GetUsersReq): Promise<GetUsersRes> {
        const usersData: UsersData | null = await this.userRepository.findUsers(req.page ?? 1, req.pageSize ?? 100, req.accountType, req.roleId, req.activationStatus, req.q);
        if (!usersData) {
            logger.error(`Failed to get users | query params: ${req}`);
            throw new HttpException(500, 'SomethingWentWrong');
        }

        return {
            data: usersData,
            errors: [],
            warnings: []
        };
    }

    public async getUser(userId: string): Promise<GetUserRes> {
        const userData: DetailedUserData | null = await this.userRepository.findUser(userId);
        if (!userData) {
            throw new HttpException(404, 'UserNotFound');
        }

        return {
            data: userData,
            errors: [],
            warnings: []
        };
    }

    public async updateUser(userId: string, accountType: string, req: UserReq): Promise<UpdateUserRes> {
        const foundUser: User | null = await this.userRepository.findById(userId);
        if (!foundUser) {
            throw new HttpException(404, 'UserNotFound');
        }

        if (foundUser.email.address != req.emailAddress.toLowerCase()) {
            const existingEmail: User | null = await this.userRepository.findByEmail(accountType, req.emailAddress.toLowerCase());
            if (existingEmail) {
                throw new HttpException(409, 'EmailAlreadyExists');
            }
        }

        if (foundUser.phone.number != req.phoneNumber) {
            const existingPhone: User | null = await this.userRepository.findByPhone(accountType, req.phoneNumber);
            if (existingPhone) {
                throw new HttpException(409, 'PhoneAlreadyExists');
            }
        }

        const updatedUser: User | null = await this.userRepository.update(userId, req);
        if (!updatedUser) {
            logger.error(`Failed to update user | userId: ${userId}, request body: ${req}`);
            throw new HttpException(500, 'SomethingWentWrong');
        }

        return {
            data: {
                success: updatedUser != null
            },
            errors: [],
            warnings: []
        };
    }

    public async deleteUser(userId: string): Promise<DeleteUserRes> {
        const foundUser: User | null = await this.userRepository.findById(userId);
        if (!foundUser) {
            throw new HttpException(404, 'UserNotFound');
        }

        if (foundUser.accountType == 'Admin') {
            throw new HttpException(403, 'CannotDeleteAdminAccount');
        }

        const updatedUser: User | null = await this.userRepository.delete(userId);
        if (!updatedUser) {
            logger.error(`Failed to delete user | userId: ${userId}`);
            throw new HttpException(500, 'SomethingWentWrong');
        }
        return {
            data: {
                success: updatedUser != null
            },
            errors: [],
            warnings: []
        };
    }
}