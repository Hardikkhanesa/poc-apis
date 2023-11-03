import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, INestApplication, UnauthorizedException, forwardRef } from '@nestjs/common';
import { UserController } from '../user.controller';
import { UsersService } from '../user.service';
import { AuthModule } from '../../auth';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthGuard } from '@nestjs/passport';
import { ValidationPipe } from '@nestjs/common';

export class MockAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        if (request.headers['authorization'] === 'valid-jwt-token') {
            return true;
        }
        return true
    }
}

describe('UserController (e2e)', () => {
    let app: INestApplication;
    let server;
    let userRepositoryMock: Partial<Record<keyof Repository<User>, jest.Mock>>;
    let usersService;

    beforeAll(async () => {
        userRepositoryMock = {
            findOne: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
            // Add other repository methods you want to mock here
        };

        const moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useValue: userRepositoryMock,
                },
            ],
        })
            .overrideGuard(AuthGuard())
            .useClass(MockAuthGuard)
            .compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());

        await app.init();

        usersService = moduleFixture.get<UsersService>(UsersService);

        server = app.getHttpServer();
    });

    afterAll(async () => {
        // await app.close();
    });

    it('/api/user/update (POST)', async () => {
        const payload = {

            "email": "test@test.com",
            "password": "newpass4323",
            "firstName": "Updated Fname",
            "lastName": "Updated Lname"

        };

        jest.spyOn(usersService, 'update').mockResolvedValue({
            "id": 2,
            "firstName": "Updated Fname",
            "lastName": "Updated Lname",
            "email": "test@test.com"
        })

        const response = await request(app.getHttpServer())
            .post('/api/user/update')
            .send(payload)
            .expect(201); // Assuming 201 is the expected status code for successful update

        // Add your assertions for the response body or headers if necessary
        expect(response.body).toBeDefined();
    });

    it('/api/user/update (POST) Should handle Bad Request wisely', async () => {
        const payload = {

         
            "firstName": "Updated Fname",
            "lastName": "Updated Lname"

        };

        jest.spyOn(usersService, 'update').mockResolvedValue({
            "id": 2,
            "firstName": "Updated Fname",
            "lastName": "Updated Lname",
            "email": "test@test.com"
        })

        const response = await request(app.getHttpServer())
            .post('/api/user/update')
            .send(payload)
            .expect(400); // Assuming 400 is the expected status code for successful update

        // Add your assertions for the response body or headers if necessary
        expect(response.body).toBeDefined();
    });


      it('/api/user/remove (DELETE)', async () => {
        const payload = {
            "email": "test2@test.com"
        };
        jest.spyOn(usersService, 'delete').mockResolvedValue('User Removed.')
        const response = await request(app.getHttpServer())
          .delete('/api/user/remove')
          .send(payload)
          .expect(200); // Assuming 200 is the expected status code for successful deletion

        // Add your assertions for the response body or headers if necessary
        console.log(response.text)
        expect(response.text).toBe('User Removed.');
      });



});
