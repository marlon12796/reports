CREATE TYPE "public"."position_enum" AS ENUM('DESARROLLADOR', 'GERENTE', 'ANALISTA', 'DISEÑADOR', 'PROGRAMADOR', 'ADMINISTRADOR', 'CONTADOR', 'SOPORTE TÉCNICO', 'RECURSOS HUMANOS');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "employees" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "employees_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"position" "position_enum",
	"start_date" date NOT NULL,
	"work_time" time with time zone NOT NULL,
	"hours_per_day" smallint NOT NULL,
	"work_schedule" text NOT NULL
);
