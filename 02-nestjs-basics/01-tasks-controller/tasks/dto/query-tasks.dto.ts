import { IsDefined, IsEnum, IsNumberString, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../enums/task-status.enum";

export class QueryTasksDto {
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @IsOptional()
    @IsString()
    sortBy?: string;

    @IsDefined()
    @IsNumberString()
    page: string;

    @IsDefined()
    @IsNumberString()
    limit: string;
}
