terraform {
  required_version = ">=1.12.1"
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4"
    }
    
    neon = {
      source  = "kislerdm/neon"
    }
  }

  backend "s3" {
    bucket                      = "foodikal"
    key                         = "terraform.tfstate"
    endpoints                   = { s3 = "https://4faf2c3b5dd13669f97dd976498ad56a.r2.cloudflarestorage.com" }
    region                      = "auto"
    skip_credentials_validation = true
    skip_metadata_api_check     = true
    skip_region_validation      = true
    skip_requesting_account_id  = true
    skip_s3_checksum            = true
    use_path_style              = true
    use_lockfile                = true
  }
}

module "postgres" {
  source                     = "./modules/postgres/"
  neon_api_key            = var.neon_api_key
  neon_project_name               = var.project_name
}