# Rental Plans — UX Flow Outline
**Wireframe:** `index.html`
**PRD:** Rental Packages — January 2026 Draft
**Prepared by:** K. Towell

---

## Scope of This Wireframe

This wireframe covers the **Admin Configuration** experience only: the standalone Rental Plans admin page where facility admins create, view, edit, and archive Rental Plans. It does not cover sales, schedule deduction, client profile, reporting, or Self Service flows (see Out of Scope section).

---

## 1. Rental Plans List

**PRD Coverage:** Story 1 (partial), Story 10 (partial)

### Page Tabs
- **Active** — shows all non-archived plans with count badge
- **Archived** — shows archived plans with count badge; switching tab resets filters and selection

### Toolbar
- Search field (searches by plan name)
- **Filters** button opens popover with:
  - Status (Active / Inactive checkboxes)
  - Purchase Model (Hours / Occurrences checkboxes)
  - Non-member Price range (min / max)
  - Member Price range (min / max)
  - Clear filters
- Results count ("X plans") displayed left of search; replaced by selection count ("X selected") when rows are checked

### Bulk Actions
- Always visible in toolbar; disabled until rows are selected
- **Active tab:** single Archive button — enabled on selection, pulses to draw attention
- **Archived tab:** Actions dropdown with Restore and Delete options
- Deselect All button appears alongside selection count

### Grid Columns
- Checkbox (select row)
- Name
- Status (Active / Inactive badge)
- Purchase Model (Hours / Occurrences)
- Non-member Price
- Member Price
- Expiry
- Row actions menu (⋯): View, Edit, Archive (or Restore / Delete on archived tab)

### New Plan Button
- Fixed in the page header; opens the Create side panel

**Notes:**
- Satisfies Story 1 list view requirements: columns, filter/search, archive action
- Bulk archive on Active tab; bulk restore and delete on Archived tab provide full lifecycle management
- Row-level View and Edit actions satisfy Story 1 and Story 10 entry points

---

## 2. Create Rental Plan (Side Panel)

**PRD Coverage:** Story 1, Story 2, Story 11, Story 14

### Panel Header
- Title: "New rental plan"
- Subtitle: "Creating new rental plan"
- Two tabs: **Plan Details** | **Pricing**

### Tab 1 — Plan Details

| Field | Notes |
|---|---|
| Plan Name | Text input, required |
| Description | Textarea |
| Status | Active / Inactive toggle |
| Purchase Model | Hours or Occurrences (radio/segmented control) — one per plan, not both |
| Quantity | Numeric input (hours or occurrences based on model) |
| Pricing Model | Flat Price or Per Unit (segmented control) |
| Non-member Price | Currency input |
| Member Price | Currency input — satisfies Story 2 member pricing |
| Expiry | Toggle on/off; when on, duration input appears (days) — satisfies Story 11 |
| Auto-Renew | Toggle on/off — satisfies Story 14 (admin configuration side) |

### Tab 2 — Pricing

- **Pricing Model** — Flat Price or Per Unit (radio selection)
- **Non-member Price** — currency input; standard price for non-members
- **Member Price** — currency input; discounted price for members

### Panel Footer
- **Save** (primary) | **Cancel** (secondary)

---

## 3. View Rental Plan (Side Panel)

**PRD Coverage:** Story 1, Story 2, Story 10, Story 11, Story 14

### Panel Header
- Plan name as title
- "Viewing rental plan" subtitle
- Single tab: **Plan Summary**
- Edit button in header opens the Edit panel for this plan

### Plan Summary (read-only)

Displays all configured fields in a structured read-only layout:

- Name, Status badge, Description
- Purchase Model, Quantity
- Pricing Model, Non-member Price, Member Price
- Expiry (duration or "No expiration")
- Auto-Renew (Enabled / Disabled)

---

## 4. Edit Rental Plan (Side Panel)

**PRD Coverage:** Story 10, Story 11, Story 14; partially addresses Q2 (Audit Trail)

### Panel Header
- Plan name as title
- "Editing rental plan" subtitle
- Three tabs: **Plan Details** | **Pricing** | **History**

### Tab 1 — Plan Details
Same fields as Create, pre-populated with saved values. All fields editable.

### Tab 2 — Pricing
Same pricing fields as Create, pre-populated with saved values: Pricing Model, Non-member Price, Member Price.

### Tab 3 — History *(Edit mode only)*
Read-only chronological audit log addressing PRD Open Question Q2. Each entry shows:
- User avatar/initials and display name
- Timestamp
- Fields changed: old value → new value
- Creation entry at the bottom ("Plan created by…")

**Note on Story 10 — Confirmation Before Saving:** The PRD specifies a confirmation prompt before saving changes. The wireframe implements a **Revert Changes** pattern instead: a "Revert Changes" button appears in the footer once any field has been edited. Clicking it shows an inline confirmation ("Revert all changes? [Revert] [Cancel]") and re-renders the panel from saved data if confirmed. This was chosen over a save confirmation modal as a less disruptive interaction. This is a **design decision for product owner review** — if save confirmation is preferred over revert, this should be flagged before handoff.

### Panel Footer
- **Save** (primary) | **Cancel** (secondary)
- **Revert Changes** button — appears only after a field has been edited; shows inline confirmation before reverting

---

## 5. Out of Scope for This Wireframe

The following PRD stories are not covered by this wireframe and will require separate design work:

| Story | Description | Notes |
|---|---|---|
| Story 3 | Staff sales flow — sell a Rental Plan to a client | Separate EZUI sales flow; similar to selling Membership Plans |
| Story 4 | Client Profile — view purchased Rental Plans and balance history | Separate Client Profile tab/sub-tab |
| Story 5 | Schedule — automatic deduction at booking time | Schedule integration |
| Story 6 | Schedule — insufficient balance handling at booking | Depends on Story 5 |
| Story 7 | Schedule — restore balance when rental is deleted | Depends on Story 5; open questions remain (see Q4) |
| Story 8 | Reporting — Rental Plan sales summary | Separate reports page |
| Story 9 | Self Service — client view of purchased plans | Post-MVP; blocked on Self Service integration |
| Story 12 | Auto-refund to package on rental cancellation | Depends on Stories 5 and 12 open decisions |
| Story 13 | Admin — manual refund of unused package rentals | Accessible from Client Profile, not this admin page |
| Story 15 | Client — family package sharing | Separate flow from Client Profile |

---

## 6. Open Questions (from PRD) — Design Impact

| # | Question | Design Notes |
|---|---|---|
| Q1 | Staff permission levels for selling vs. configuring | No permission-gating shown in this wireframe; will need to be layered in once permission model is defined |
| Q2 | Audit trail requirements | Addressed in wireframe via the **History tab** on the Edit panel (read-only log of who changed what and when). Scope and retention policy TBD with Engineering. |
| Q3 | Can an active (sold) plan configuration be edited? | Wireframe allows editing all fields. If sold plans require restrictions on certain fields, field-level disabling or warnings will be needed. |
| Q4 | Balance restoration on delete — automatic or prompted? | Not addressed in this wireframe (Schedule flow). Behavior decision needed before Story 7 design. |
| Q5 | Reporting approach — new report vs. update existing | Not addressed in this wireframe. |
| Q6 | Terminology differences from Package Plans | Wireframe uses "Rental Plans" throughout. "Check-In" vs. "Attended" and other term decisions apply to Schedule and Client Profile flows, not this admin page. |

---

## 7. Design Decisions for Product Owner Review

1. **Revert Changes vs. Save Confirmation (Story 10)** — The PRD specifies a confirmation prompt before saving. The wireframe uses a Revert Changes button instead. Confirm preferred pattern before handoff.

2. **Audit History tab (Q2)** — Added to the Edit panel as a proactive design decision to address Q2. Confirm whether this satisfies the audit trail requirement or whether a more robust solution (e.g., separate audit log page, exportable log) is needed.

3. **Member vs. Non-member Pricing** — The Pricing tab uses Member and Non-member pricing only (no Rental Rates integration or Custom Rates concept). Confirm this is the correct scope before handoff.
