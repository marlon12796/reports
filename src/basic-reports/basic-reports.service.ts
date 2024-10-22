import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { Employess } from 'src/drizzle/schema/employees.schema';
import { DrizzleDB } from 'src/drizzle/types/types';
import pdfPrinter from "pdfmake"
@Injectable()
export class BasicReportsService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}
  getHello() {
    return this.db.select().from(Employess);
  }
}
