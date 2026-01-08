import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
    constructor() {
        super({
            datasources: {
                db: {
                    url: process.env.DATABASE_URL,
                }
            }
        })
    }
    async onModuleInit() {
        await this.$connect();
    }
}
