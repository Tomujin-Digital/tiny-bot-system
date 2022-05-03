import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './model/user.model';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getUser({ id, discordId }: any) {
    const filter: any = {};
    if (id) filter._id = id;
    if (discordId) filter.discordId = discordId;
    const user = this.userModel.findOne(filter);
    return user;
  }

  async getUsers() {
    const users = this.userModel.find();
    return users;
  }
}
