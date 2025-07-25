output "project_id" {
  value = neon_project.my_app_project.id
}
output "project_connection_uri" {
  description = "Default connection URI for the primary branch (contains credentials)."
  value       = neon_project.my_app_project.connection_uri
  sensitive   = true
}
output "project_default_branch_id" {
  value = neon_project.my_app_project.default_branch_id
}
output "project_database_user" {
  value = neon_project.my_app_project.database_user
}