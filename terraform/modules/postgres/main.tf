# Postgres service module

resource "neon_project" "foodikal" {
  name       = var.project_name
  pg_version = 17
  region_id  = "aws-eu-west-1"
  # Configure default branch settings (optional)
  branch {
    name          = "production"
    database_name = "foodikal_db"
    role_name     = "foodikal_admin"
  }
  # Configure default endpoint settings (optional)
  default_endpoint_settings {
    autoscaling_limit_min_cu = 1.0
    autoscaling_limit_max_cu = 2.0
    suspend_timeout_seconds  = 300
  }
}