import { Controller, Post, Get, Body } from '@nestjs/common';
import { FeedbackService } from './feedback.service';

@Controller('api/feedback')
export class FeedbackController {
    constructor(private readonly feedbackService: FeedbackService) {}

    @Post()
    create(@Body() data: { nama: string; email: string; rating: number; komentar?: string }) {
        return this.feedbackService.create(data);
    }

    @Get('results')
    getResults() {
        return this.feedbackService.getResults();
    }
}
