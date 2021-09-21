import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UsersService {
    async create(createUserDto: CreateUserDto) {
    const user = User.create(createUserDto);
    await user.save();

    delete user.password;
    return user;
  }

  async update(updateUserDto: UpdateUserDto) {
      updateUserDto.password =  await bcrypt.hash(updateUserDto.password, 8)
      const user = User.update({id: updateUserDto.id}, updateUserDto)
      return user.then(res => {
          res.raw
      })
  }

  async showById(id: number): Promise<User> {
    const user = await this.findById(id);

    delete user.password;
    return user;
  }

 async getAllUsers() : Promise<User[]> {
     return await User.find();
 }

  async findById(id: number) {
    return await User.findOne(id);
  }

  async findByEmail(email: string) {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  }
}
