---
project: KineLab Milano
type: Production Website + Booking System
tech-stack: Next.js 16, Payload CMS, PostgreSQL, MinIO S3, Docker, Traefik
initialized: 2026-01-24
---

# KineLab Project State

## Current Position

**Phase:** 04 of N/A (Portfolio Engine)
**Plan:** 04-01 completed
**Status:** In progress
**Last activity:** 2026-01-24 - Completed 04-01-PLAN (Portfolio schema + Sharp.js + Upload API)

**Progress:** ████░░░░░░░░░░░░░░░░ (Phase 04 Plan 01 complete)

## Project Overview

KineLab Milano is a professional fitness studio website offering Pilates, Functional Training, and Personal Training services. The site features:
- Service catalog with detailed pages
- Team member profiles
- Booking system integration
- Portfolio/gallery for showcasing studio and client work
- SEO optimization for local search (Milano)
- Payload CMS for content management

**Live URL:** https://kinelab.fodivps2.cloud
**Repository:** git@github.com:emanuele-galle/kinelab.git

## Completed Work

### Phase 04: Portfolio Engine
| Plan | Name | Completed | Summary |
|------|------|-----------|---------|
| 04-01 | Schema + Sharp.js + Upload API | 2026-01-24 | Portfolio collections, image processing pipeline, WebP optimization, focal point cropping |

## Active Development

**Current Focus:** Phase 04 - Portfolio Engine
**Wave 1 Plans:**
- ✅ 04-01: Schema + Sharp.js + Upload API (completed)
- ⏳ 04-02: Frontend gallery + filtering + lightbox (pending)

## Decisions Made

| ID | Decision | Rationale | Phase |
|----|----------|-----------|-------|
| payload-over-prisma | Use Payload CMS collections instead of separate Prisma schema | Payload already provides schema + DB abstraction; Prisma would be redundant | 04-01 |
| webp-default-format | Default to WebP for all optimized images | 29-42% compression improvement with 97%+ browser support | 04-01 |
| focal-point-support | Implement x,y percentage focal points for smart cropping | Editorial control without expensive AI or complex crop editors | 04-01 |
| build-time-db-skip | Set dummy DATABASE_URL during Docker build stage | Payload tries DB connection during static generation; graceful fallbacks handle this | 04-01 |

## Technical Debt & Issues

### Known Issues
None currently blocking.

### Technical Debt
1. **Database migrations**: New Portfolio collections created but no migration system in place for schema changes
2. **Image upload testing**: Upload API endpoints created but not tested with real files
3. **Focal point UI**: No admin UI for selecting focal points visually (manual x,y entry only)

## Blockers & Concerns

### Blockers
None currently.

### Concerns
1. **Static generation during Docker build**: Payload attempts DB connection during build; handled with fallbacks but generates error logs
2. **S3 storage quotas**: No monitoring on MinIO bucket usage for portfolio images
3. **Upload validation**: File type validation in place but no image dimension or malware checking

## Infrastructure

### Services
- **App**: Next.js 16 + Payload CMS (kinelab_app container)
- **Database**: PostgreSQL (vps-panel-postgres, shared)
- **Storage**: MinIO S3 (vps-panel-minio, shared)
- **Routing**: Traefik with Let's Encrypt SSL

### Database
- **Name:** kinelab_db
- **User:** kinelab_user
- **Host:** vps-panel-postgres:5432
- **Collections:** Users, Media, Portfolio, PortfolioMedia, Services, Packages, TeamMembers, Bookings, Clients, Testimonials, FAQs, ContactSubmissions

### Storage (MinIO)
- **Bucket:** kinelab-media
- **Prefixes:**
  - `kinelab/` - General media
  - `kinelab/portfolio/` - Portfolio images (new)

## Session Continuity

**Last session:** 2026-01-24 00:07:52 UTC
**Stopped at:** Completed 04-01-PLAN - Portfolio schema + Sharp.js + Upload API
**Resume file:** None (ready to start 04-02)
**Next actions:**
1. Start Phase 04 Plan 02: Frontend portfolio gallery component
2. Implement category filtering
3. Add lightbox/modal for image viewing
4. Test focal point cropping in production
5. Add admin UI improvements for focal point selection

## Git Status

**Branch:** main
**Last commit:** 2ee8199 - fix(04-01): add build-time env vars to prevent database connection during Docker build
**Remote:** origin (github.com:emanuele-galle/kinelab.git)
**Status:** Clean working tree, all changes committed

## Notes

- Project uses Payload CMS instead of traditional Prisma, so "schema" refers to Payload CollectionConfig
- Docker builds require dummy DATABASE_URL due to static generation attempting DB connections
- Sharp.js pipeline configured for WebP optimization with focal point support
- All portfolio images stored in MinIO S3 with dedicated prefix for organization
