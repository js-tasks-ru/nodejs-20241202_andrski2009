import { IsDefined, IsEnum, IsString } from "class-validator";
import { TaskStatus } from "../enums/task-status.enum";

export class CreateTaskDto {
    @IsDefined()
    @IsString()
    title: string;

    @IsDefined()
    @IsString()
    description: string;

    @IsDefined()
    @IsEnum(TaskStatus)
    status: TaskStatus;
}
