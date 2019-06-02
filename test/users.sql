        CREATE TABLE public.users
        (
            id serial NOT NULL,
            username character varying(255) COLLATE pg_catalog."default" NOT NULL,
            password character varying(2048) COLLATE pg_catalog."default" NOT NULL,
            age integer NOT NULL,
            height integer NOT NULL,
            weight integer NOT NULL,
            gender character varying(10) COLLATE pg_catalog."default",
            mealplan_default character varying(255) COLLATE pg_catalog."default",
            CONSTRAINT "userID_PKey" PRIMARY KEY (id)
        );
