DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'continent_enum') THEN
        CREATE TYPE "public"."continent_enum" AS ENUM(
            'Asia', 
            'Africa', 
            'Europe', 
            'North America', 
            'South America', 
            'Australia (Oceania)'
        );
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'position_enum') THEN
        CREATE TYPE "public"."position_enum" AS ENUM(
            'DESARROLLADOR', 
            'GERENTE', 
            'ANALISTA', 
            'DISEÑADOR', 
            'PROGRAMADOR', 
            'ADMINISTRADOR', 
            'CONTADOR', 
            'SOPORTE TÉCNICO', 
            'RECURSOS HUMANOS'
        );
    END IF;
END $$;
-- breakpoint
CREATE TABLE IF NOT EXISTS "countries" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "countries_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"code" varchar(2) NOT NULL,
	"name" text NOT NULL,
	"phone" smallint NOT NULL,
	"capital" text,
	"currency" varchar(3),
	"continent" "continent_enum"
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "employees" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "employees_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"position" "position_enum" NOT NULL,
	"start_date" date NOT NULL,
	"work_time" time with time zone NOT NULL,
	"hours_per_day" smallint NOT NULL,
	"work_schedule" text NOT NULL
);
