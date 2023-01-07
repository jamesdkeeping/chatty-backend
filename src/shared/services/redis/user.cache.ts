import { BaseCache } from '@service/redis/base.cache';
import { IUserDocument } from '@user/interfaces/user.interface';

export class UserCache extends BaseCache {
  constructor() {
    super('userCache');
  }

  async saveUserToCache(key: string, userId: string, createdUser: IUserDocument): Promise<void> {
    const createdAt = new Date();
    const {
      _id,
      uId,
      username,
      email,
      avatarColor,
      blocked,
      blockedBy,
      postsCount,
      profilePicture,
      followersCount,
      followingCount,
      notifications,
      work,
      location,
      school,
      quote,
      bgImageId,
      bgImageVersion,
      social
    } = createdUser;
    const firstList: string[] = [
        'id', `${_id}`,
        'uId', `${uId}`,
        'username', `${username}`,
        'email', `${email}`,
        'avatarColor', `${avatarColor}`,
        'createdAt', `${createdAt}`,
        'postsCount', `${postsCount}`,
    ];

  }
}
