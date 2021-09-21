import {
    Injectable, UnauthorizedException
} from '@nestjs/common';
import {
    JwtService
} from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { AuthLoginDto } from 'src/users/users.dto';
import {
    UsersService
} from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}
    async login(authLoginDto: AuthLoginDto) {
        const user = await this.validateUser(authLoginDto);

        const payload = {
            userId: user.id,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateUser(authLoginDto: AuthLoginDto): Promise < User > {
        const {
            email,
            password
        } = authLoginDto;

        const user = await this.usersService.findByEmail(email);
        if (!(await user ?.validatePassword(password))) {
            throw new UnauthorizedException();
        }

        return user;
    }
}