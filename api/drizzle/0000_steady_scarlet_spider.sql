CREATE TABLE "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"status" boolean DEFAULT false NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
