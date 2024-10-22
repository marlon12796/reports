import {
  date,
  integer,
  pgTable,
  text,
  time,
  smallint,
  pgEnum,
} from 'drizzle-orm/pg-core';
export const positionEnum = pgEnum('position_enum', [
  'DESARROLLADOR',
  'GERENTE',
  'ANALISTA',
  'DISEÑADOR',
  'PROGRAMADOR',
  'ADMINISTRADOR',
  'CONTADOR',
  'SOPORTE TÉCNICO',
  'RECURSOS HUMANOS',
]);
export const Employess = pgTable('employees', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: text('name').notNull(),
  position: positionEnum(),
  startDate: date('start_date').notNull(),
  workTime: time('work_time', { withTimezone: true }).notNull(),
  hoursPerDay: smallint('hours_per_day').notNull(),
  workSchedule: text('work_schedule').notNull(),
});
