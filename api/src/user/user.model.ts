import { db } from "../database";

type User = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  bio: string;
  password: string;
};

export class UserModel {
  async getUserById(userId: number): Promise<User | null> {
    try {
      const query = 'SELECT * FROM "user" WHERE id = $1';
      const values = [userId];
      const result = await db.query(query, values);

      if (result.rows.length <= 0) {
        return null;
      }
      return result.rows[0];
    } catch (error) {
      return null;
    }
  }

  async getUserByUsername(username: string): Promise<User | null> {
    try {
      const query = 'SELECT * FROM "user" WHERE username = $1';
      const values = [username];
      const result = await db.query(query, values);

      if (result.rows.length <= 0) {
        return null;
      }
      return result.rows[0];
    } catch (error) {
      return null;
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const query = 'SELECT * FROM "user" WHERE email = $1';
      const values = [email];
      const result = await db.query(query, values);

      if (result.rows.length <= 0) {
        return null;
      }
      return result.rows[0];
    } catch (error) {
      return null;
    }
  }

  async getAllUsers(): Promise<User[] | []> {
    try {
      const query = 'SELECT * FROM "user"';
      const result = await db.query(query);

      if (result.rows.length <= 0) {
        return [];
      }
      return result.rows;
    } catch (error) {
      return [];
    }
  }
}
