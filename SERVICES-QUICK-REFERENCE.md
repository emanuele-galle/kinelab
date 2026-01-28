# Services Section - Quick Reference Guide

**For:** Quick updates and customization of the redesigned services section

---

## 🎨 Updating Colors

### Category Accent Colors

**File:** `src/components/sections/ServicesSection.tsx` (lines 16-36)

```typescript
const categoryColors: Record<string, {...}> = {
  pilates: {
    accent: '#7A8B6E',     // Change this for left border color
    badgeBg: 'rgba(122, 139, 110, 0.1)',  // Feature badge backgrounds
    glow: 'rgba(122, 139, 110, 0.3)',     // Hover glow (future use)
  },
  functional: {
    accent: '#E87722',     // Orange for energetic feel
    ...
  },
  personal: {
    accent: '#2C3E50',     // Navy for professional feel
    ...
  },
}
```

**Tip:** Use [Coolors.co](https://coolors.co) to generate harmonious color palettes.

---

## ⭐ Updating Social Proof Data

### Ratings, Reviews, Bookings

**File:** `src/components/sections/ServicesSection.tsx` (lines 41-69)

```typescript
const socialProofData: Record<string, {...}> = {
  pilates: {
    rating: 4.9,           // ⬅️ Update with real rating
    reviews: 142,          // ⬅️ Update with real review count
    bookings: 23,          // ⬅️ Update with real weekly bookings
    difficulty: 'Principiante',
    difficultyColor: '#00C853',
  },
  // ... other services
}
```

**Recommendation:** Connect to Payload CMS in the future for dynamic data.

---

## 💰 Updating Pricing

### Package Discounts

**File:** `src/components/ui/PricingPanel.tsx` (lines 20-43)

```typescript
const packages: Package[] = [
  {
    sessions: 1,
    totalPrice: basePrice,
    pricePerSession: basePrice,
    savings: 0,
    savingsPercent: 0,
  },
  {
    sessions: 5,
    totalPrice: basePrice * 5 * 0.95,  // ⬅️ Change 0.95 to adjust discount
    pricePerSession: basePrice * 0.95,
    savings: basePrice * 5 * 0.05,
    savingsPercent: 5,                 // ⬅️ Update percentage
  },
  {
    sessions: 10,
    totalPrice: basePrice * 10 * 0.9,  // ⬅️ Change 0.90 for 10% discount
    pricePerSession: basePrice * 0.9,
    savings: basePrice * 10 * 0.1,
    savingsPercent: 10,
    badge: 'MIGLIOR VALORE',           // ⬅️ Change badge text
  },
]
```

**Example:** For 15% discount on 10-pack, change `0.9` to `0.85` and `0.1` to `0.15`.

---

## 🔥 Updating Urgency Badges

### Badge Text & Icons

**File:** `src/components/sections/ServicesSection.tsx` (lines 74-98)

```typescript
const urgencyBadges: Record<string, {...} | null> = {
  pilates: {
    text: 'Più richiesto',    // ⬅️ Change badge text
    icon: 'flame',             // Options: 'flame', 'trending', 'zap'
    color: 'bg-orange-500',    // Tailwind color
    pulse: true,               // Enable/disable pulse animation
  },
  personal: {
    text: 'Posti limitati',
    icon: 'trending',
    color: 'bg-red-500',
    pulse: true,
  },
  functional: null,            // ⬅️ Set to null to hide badge
}
```

**Available Icons:**
- `flame` - Fire icon (popularity)
- `trending` - Trending up (scarcity)
- `zap` - Lightning bolt (new/exciting)

---

## 🏷️ Updating Feature Badges

### Service Features (Chips)

**File:** `src/components/sections/ServicesSection.tsx` (lines 175-179)

```typescript
const categoryFeatures: Record<string, string[]> = {
  pilates: ['Mat Pilates', 'Reformer', 'Small Group'],  // ⬅️ Edit features
  functional: ['Bodyweight', 'Kettlebell', 'TRX'],
  personal: ['1-to-1', 'Programma su misura', 'Monitoraggio'],
}
```

**Tip:** Keep to 3 features max for optimal display.

---

## 🎬 Updating Media (Images/Videos)

### Service Backgrounds

**File:** `src/components/sections/ServicesSection.tsx` (lines 103-137)

```typescript
const categoryMedia: Record<string, {...}> = {
  pilates: {
    image: {
      src: 'https://images.unsplash.com/...',  // ⬅️ Replace with your image
      alt: 'Pilates training session',
    },
    video: {
      src: 'https://videos.pexels.com/...',    // ⬅️ Replace with your video
      poster: '...',                            // Same as image.src
    },
  },
  // ... other services
}
```

**Recommended Sizes:**
- Image: 800x600px (4:3 aspect ratio)
- Video: 1280x960px or higher (MP4 format)

**Free Resources:**
- [Unsplash](https://unsplash.com) - Free images
- [Pexels Videos](https://pexels.com/videos) - Free videos

---

## 🎯 Adjusting Difficulty Levels

### Difficulty Badge Colors

**File:** `src/components/sections/ServicesSection.tsx` (lines 41-69)

```typescript
const socialProofData: Record<string, {...}> = {
  pilates: {
    difficulty: 'Principiante',    // ⬅️ Change level
    difficultyColor: '#00C853',    // ⬅️ Green for beginner
  },
  functional: {
    difficulty: 'Intermedio',
    difficultyColor: '#FF9800',    // Orange for intermediate
  },
  personal: {
    difficulty: 'Avanzato',
    difficultyColor: '#FF5252',    // Red for advanced
  },
}
```

**Suggested Colors:**
- Beginner: `#00C853` (Green)
- Intermediate: `#FF9800` (Orange)
- Advanced: `#FF5252` (Red)

---

## 🧲 Configuring Magnetic Button

### Strength & Radius

**File:** `src/components/sections/ServicesSection.tsx` (line 200)

```typescript
const { elementRef, magneticStyle } = useMagneticCursor({
  strength: 8,      // ⬅️ Max displacement in pixels (default: 8)
  radius: 100,      // ⬅️ Activation radius in pixels (default: 100)
  stiffness: 150,   // Spring stiffness (optional)
  damping: 15,      // Spring damping (optional)
})
```

**Effects:**
- **Higher strength** = Stronger magnetic pull (try 12-15)
- **Larger radius** = Earlier activation (try 150)
- **Higher stiffness** = Snappier animation (try 200)
- **Lower damping** = Bouncier effect (try 10)

---

## 🎨 Adjusting Spacing

### Section & Card Spacing

**File:** `src/app/globals.css` (lines 304-313)

```css
.section-premium {
  padding: 120px 0;  /* ⬅️ Desktop vertical padding */
  background: var(--color-bg-accent);
}

@media (max-width: 768px) {
  .section-premium {
    padding: 80px 0;  /* ⬅️ Mobile vertical padding */
  }
}
```

**File:** `src/components/sections/ServicesSection.tsx` (line 445)

```typescript
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
  {/*                                           ⬆️        */}
  {/*                              Change gap-8 to gap-6, gap-10, etc. */}
</div>
```

**Tailwind Gap Values:**
- `gap-6` = 24px
- `gap-8` = 32px (current)
- `gap-10` = 40px
- `gap-12` = 48px

---

## ✨ Adjusting Animations

### Card Hover Effect

**File:** `src/components/sections/ServicesSection.tsx` (lines 217-218)

```typescript
whileHover={{ scale: 1.05, y: -12 }}  // ⬅️ Change scale/y values
transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
```

**Examples:**
- Subtle: `scale: 1.02, y: -6`
- Medium: `scale: 1.05, y: -12` (current)
- Strong: `scale: 1.08, y: -16`

### Video Transition Speed

**File:** `src/components/sections/ServicesSection.tsx` (line 244)

```typescript
<div className="... transition-all duration-800 ...">
  {/*                                  ⬆️           */}
  {/*                    Change to duration-500, duration-1000, etc. */}
</div>
```

### Particle Animation Speed

**File:** `src/app/globals.css` (lines 1047-1074)

```css
.animate-float {
  animation: float 6s ease-in-out infinite;  /* ⬅️ Change 6s */
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;  /* ⬅️ Change 8s */
}

.animate-float-slow {
  animation: float-slow 10s ease-in-out infinite;  /* ⬅️ Change 10s */
}
```

**Recommendation:** Keep between 4s-12s for smooth effect.

---

## 🔧 Adding a New Service Category

### Step-by-Step

1. **Add to categoryColors** (line 16):
```typescript
newCategory: {
  accent: '#YOUR_COLOR',
  badgeBg: 'rgba(YOUR_RGB, 0.1)',
  glow: 'rgba(YOUR_RGB, 0.3)',
},
```

2. **Add to socialProofData** (line 41):
```typescript
newCategory: {
  rating: 4.8,
  reviews: 50,
  bookings: 10,
  difficulty: 'Intermedio',
  difficultyColor: '#FF9800',
},
```

3. **Add to urgencyBadges** (line 74):
```typescript
newCategory: {
  text: 'Your Badge',
  icon: 'zap',
  color: 'bg-blue-500',
  pulse: true,
},
```

4. **Add to categoryMedia** (line 103):
```typescript
newCategory: {
  image: { src: '...', alt: '...' },
  video: { src: '...', poster: '...' },
},
```

5. **Add to categoryFeatures** (line 175):
```typescript
newCategory: ['Feature 1', 'Feature 2', 'Feature 3'],
```

6. **Add to categoryType** (line 184):
```typescript
newCategory: 'Individuale / Gruppo',
```

7. **Create service in Payload CMS** with `category: 'newCategory'`

---

## 🚀 Rebuilding After Changes

### Development (Local Testing)
```bash
cd /var/www/projects/kinelab
npm run dev
```

### Production Deployment
```bash
cd /var/www/projects/kinelab
/home/sviluppatore/scripts/docker-smart-rebuild.sh app --no-cache
```

**Rebuild Time:** ~2-3 minutes
**Downtime:** 0 seconds (zero-downtime deployment)

---

## 📊 Testing Checklist

After making changes, test:

- [ ] Desktop hover effects work smoothly
- [ ] Mobile touch interactions feel natural
- [ ] Pricing panel appears on hover (desktop only)
- [ ] Magnetic cursor effect works (desktop only)
- [ ] Category colors are distinct
- [ ] Social proof displays correctly
- [ ] Animations are smooth (60fps)
- [ ] Text is readable (contrast ≥4.5:1)

**Quick Test URL:** `https://kinelab.fodivps2.cloud/#servizi`

---

## 🆘 Troubleshooting

### Issue: Pricing panel doesn't appear on hover

**Solution:** Check `onHoverStart` and `onHoverEnd` props on card:
```typescript
onHoverStart={() => setShowPricing(true)}
onHoverEnd={() => setShowPricing(false)}
```

### Issue: Magnetic button not working

**Solution:**
1. Check if cursor is within 100px radius
2. Verify `useMagneticCursor` hook is imported
3. Test on desktop (disabled on mobile)

### Issue: Particles not animating

**Solution:** Check CSS animations in `globals.css`:
```css
.animate-float {
  animation: float 6s ease-in-out infinite;
  will-change: transform, opacity;  /* ⬅️ Important for performance */
}
```

### Issue: Category color not showing

**Solution:** Verify category name matches exactly (case-sensitive):
- ✅ `pilates`, `functional`, `personal`
- ❌ `Pilates`, `PILATES`, `pilates ` (trailing space)

---

## 📞 Support

**Documentation:**
- Implementation Summary: `SERVICES-REDESIGN-IMPLEMENTATION.md`
- Before/After Comparison: `BEFORE-AFTER-COMPARISON.md`
- This Guide: `SERVICES-QUICK-REFERENCE.md`

**Files to Know:**
- Main Component: `src/components/sections/ServicesSection.tsx`
- Pricing Panel: `src/components/ui/PricingPanel.tsx`
- Rating Display: `src/components/ui/RatingDisplay.tsx`
- Magnetic Hook: `src/hooks/useMagneticCursor.ts`
- Styles: `src/app/globals.css`

---

**Last Updated:** 2026-01-25
**Version:** 1.0
