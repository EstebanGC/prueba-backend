provider "aws" {
  region     = "us-east-1"
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
}

resource "aws_db_instance" "productos_db" {
  engine            = "postgres"
  instance_class    = "db.t3.micro"
  allocated_storage = 20
  name              = "productos"
  username          = "postgres"
  password          = var.db_password
  parameter_group_name = "default.postgres15"
  skip_final_snapshot  = true
}