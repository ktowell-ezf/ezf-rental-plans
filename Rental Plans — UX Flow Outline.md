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
  - Status (Available / Unavailable checkboxes)
  - Purchase Model (Hours / Occurrences checkboxes)
  - Non-member Price range (min / max)
  - Member Price range (min / max)
  - Start Date range (from / to)
  - Clear filters
- Results count ("X plans") displayed left of search; replaced by selection count ("X selected") when rows are checked

### Bulk Actions
- Always visible in toolbar; disabled until rows are selected
- **Active tab:** single Archive button — enabled on selection
- **Archived tab:** Actions dropdown with Restore and Delete options
- Deselect All button appears alongside selection count

### Grid Columns
- Checkbox (select row)
- Name
- Status (Available / Unavailable badge)
- Purchase Model (Hours / Occurrences)
- Non-member Price
- Member Price
- Expiration — shows the calculated calendar date (e.g. "Apr 1, 2026") when the plan has both a Plan Start Date and an expiration period and is not set to "Default to plan sale date". Falls back to the duration string ("90 days", "6 months") when a specific date can't be computed, or "No expiration" when the toggle is off.
- Start Date
- Row actions menu (⋯): View, Edit, Archive (or Restore / Delete on archived tab)

All columns are sortable. Clicking a column header cycles through ascending → descending → default (unsorted). The active sort direction is indicated by an arrow icon.

### New Plan Button
- Fixed in the page header; opens the Create side panel

---

## 2. Create Rental Plan (Side Panel)

**PRD Coverage:** Story 1, Story 2, Story 11, Story 14

### Panel Header
- Title: "Add Rental Plan"
- Two tabs: **Plan Details** | **Pricing**

### Two-Step Flow

Creating a plan is a two-step flow. The user completes Plan Details first, then advances to Pricing. **When the user clicks "Pricing ›", the plan is immediately saved to the list with a status of Unavailable.** This ensures plan details are never lost even if the user exits before completing pricing. The plan remains Unavailable until pricing is saved.

### Tab 1 — Plan Details

**Plan Info section**

| Field | Notes |
|---|---|
| Plan Name | Text input, required |
| Rental Type | Dropdown (Court, Field, Lane, Pool, Room, Track), required |
| Description | Textarea, optional |

**Plan Settings section**

| Field | Notes |
|---|---|
| Selling Status | Available / Unavailable toggle |
| Plan Start Date | Date input, defaults to today's date. A **"Default to plan sale date"** checkbox sits above the field; when checked, the date input is disabled and the plan inherits its start date from the client's purchase date. |
| Expiration | Toggle on/off; when on, duration input appears (number + unit: Days / Weeks / Months / Years); duration is required when toggle is on. A live highlighted **"Expires on [calculated date]"** chip appears under the inputs, updating as the start date or duration change. The chip is suppressed when "Default to plan sale date" is checked. An **"Allow booking out of range"** checkbox sits at the bottom of the section and is hidden when the toggle is off. |
| Auto-Renew | Toggle on/off; when on, additional fields appear (see below) |

**Auto-Renew fields (shown when Auto-Renew is enabled)**

- **Renewal Trigger** — radio selection between:
  - `[number] [Days/Weeks/Months/Years]` before expiration
  - When the renewal threshold is reached
- **Renews As** — custom dropdown with two options:
  - A copy of itself (default)
  - As another plan — searchable list of existing active plans

**Sharing section** *(new)*

| Field | Notes |
|---|---|
| Share with | Single-select dropdown listing 14 client-group options: All child clients, All coach clients, All employee clients, All employer clients, All grandchild clients, All grandparent clients, All other clients, All parent clients, All player clients, All sibling clients, All spouse clients, All team clients, All team manager clients, All related clients. Optional — defaults to no selection. The dropdown opens **upward** because the section sits at the bottom of the panel; this is implemented as a custom dropdown rather than a native `<select>`. |

### Tab 1 Footer
- Left: **Cancel** (calls unsaved-changes check)
- Right: **Pricing ›** (validates tab 1, auto-saves as Unavailable, advances to Pricing tab)

### Tab 2 — Pricing

| Field | Notes |
|---|---|
| Purchase Model | Per Occurrence (flat price per rental) or Per Hour (time-based pricing) — radio/card selection |
| Quantity | Numeric input; Unlimited checkbox disables the input and sets quantity to unlimited |
| Fees — Non-member | Currency input |
| Fees — Member | Currency input |

### Tab 2 Footer
- Left: **Cancel** (calls unsaved-changes check)
- Right: **‹ Plan Details** (returns to tab 1) | **Save Plan** (validates and saves)

### Validation

**Plan Details tab** — validated when "Pricing ›" is clicked:
- Plan Name: required
- Rental Type: required
- Description: optional
- Expiration duration: required when the Expiration toggle is on

If any Plan Details fields are invalid, inline error messages appear and navigation to Pricing is blocked.

**Pricing tab** — validated when "Save Plan" is clicked:
- Quantity: required unless Unlimited is checked
- Fees: if both price fields are left blank, a confirmation prompt appears ("Save without pricing?") rather than blocking the save — the user can save anyway and the plan will remain Unavailable. If a price is entered but invalid (e.g. 0), an inline error appears below the fee fields.

### Confirmation Modals

**Exiting after Plan Details have been saved** (i.e. the user advanced to Pricing but hasn't saved pricing yet):
> "Exit without completing pricing?"
> "Your plan has been saved but will remain unavailable for sale until you add pricing. You can edit it any time."
> **Exit** | **Return to form**

**Exiting before any data has been saved** (i.e. still on Plan Details with unsaved changes):
> "Exit without saving?"
> "Your changes won't be saved if you exit now."
> **Exit** | **Return to form**

**Saving with no fees entered:**
> "Save without pricing?"
> "Your plan has been saved but will remain unavailable for sale until you add pricing. You can edit it any time."
> **Save anyway** | **Return to form**

---

## 3. View Rental Plan (Side Panel)

**PRD Coverage:** Story 1, Story 2, Story 10, Story 11, Story 14

### Panel Header
- Plan name as title
- Single tab: **Plan Summary**
- Edit button in header opens the Edit panel for this plan

### Plan Summary (read-only)

Displays all configured fields in a structured read-only layout, grouped to mirror the Create/Edit tab structure:

**Plan Info**
- Plan Name, Rental Type, Description

**Plan Settings**
- Selling Status
- Plan Start Date — reads **"Plan sale date"** when the plan defaults to sale date; otherwise shows the configured calendar date or "Not set"
- Expiration: "No expiration" when off. Otherwise: a bolded **"Expires on [date]"** line followed by the duration line (`[n] [unit] from the plan's start date`). The "Expires on" line is suppressed when the plan defaults to sale date. When **"Allow booking out of range"** is also set, the duration line and "Booking out of range allowed" render as bullet points; otherwise the duration is a single line of text.
- Auto-Renew: Enabled or Disabled; when enabled, shows renewal trigger and "Renews as" value

**Sharing** *(new)*
- Share with — selected client group. The Sharing section is hidden entirely when no group is selected.

**Pricing**
- Purchase Model, Quantity
- Fees — Non-member, Member

---

## 4. Edit Rental Plan (Side Panel)

**PRD Coverage:** Story 10, Story 11, Story 14; partially addresses Q2 (Audit Trail)

### Panel Header
- Plan name as title
- Three tabs: **Plan Details** | **Pricing** | **History**

### Tab 1 — Plan Details
Same fields and groupings as Create, pre-populated with saved values. All fields editable.

### Tab 2 — Pricing
Same fields as Create, pre-populated with saved values: Purchase Model, Quantity, Fees (Non-member, Member).

Plans that were saved without pricing (status: Unavailable, null prices) can be opened and edited. The price fields render empty and the same "Save without pricing?" confirmation prompt applies if the user saves without entering fees.

### Tab 3 — History *(Edit mode only)*
Read-only chronological audit log addressing PRD Open Question Q2. Each entry shows:
- User avatar/initials and display name
- Timestamp
- Fields changed: old value → new value
- Creation entry at the bottom ("Plan created by…")

### Panel Footer
- **Save Plan** (primary) | **Cancel** (secondary)

**Cancel** uses the same unsaved-changes check as the Create panel: if fields have been changed, a confirmation prompt appears before closing.

> "Exit without saving?"
> "Your changes won't be saved if you exit now."
> **Exit** | **Return to form**

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

1. **Two-step Create flow with auto-save** — Plan Details are saved immediately when the user advances to Pricing, assigning the plan an Unavailable status. This prevents data loss if the user exits before completing pricing and allows them to find and resume the plan from the list. Confirm this is the preferred behavior over a single-save approach.

2. **Fees not required to save** — Rather than blocking save when fees are empty, the wireframe shows a confirmation prompt and allows saving with null prices (plan remains Unavailable). This accommodates workflows where an admin may want to set up plan details ahead of time and add pricing later. Confirm this matches expected behavior.

3. **Audit History tab (Q2)** — Added to the Edit panel as a proactive design decision to address Q2. Confirm whether this satisfies the audit trail requirement or whether a more robust solution (e.g., separate audit log page, exportable log) is needed.

4. **Member vs. Non-member Pricing** — The Pricing tab uses Member and Non-member pricing only (no Rental Rates integration or Custom Rates concept). Confirm this is the correct scope before handoff.

5. **"Default to plan sale date" + calculated expiration date** *(Story 11)* — A new "Default to plan sale date" checkbox lets plans inherit their start date from the client's purchase date instead of a fixed calendar date. Independently, when a Plan Start Date and expiration period are both set, the system now surfaces the calculated calendar expiration date as a highlighted chip in Plan Details, as a bolded line in Plan Summary, and as the value in the Expiration column on the list grid. Confirm both behaviors are desired, and confirm what should happen when a "Default to plan sale date" plan is sold (do staff see a confirmation date at the point of sale?).

6. **"Allow booking out of range" flag** *(Story 11)* — A new checkbox at the bottom of the Expiration section lets admins explicitly allow bookings outside the expiration window. When enabled, Plan Summary lists the period and "Booking out of range allowed" as bullets. **Open question:** the PRD doesn't currently define what "out of range" means — does it cover dates past expiration, before the start date, or both? Needs PO clarification before Schedule integration (Story 5).

7. **Sharing — "Share with" single-select** *(Story 15)* — A new Sharing panel-section was added with a single-select dropdown listing 14 client-relationship groups (parents, children, spouses, team managers, etc.). The dropdown opens upward because the section sits at the bottom of Plan Details. **Open questions:** Is single-select correct, or should multiple groups be selectable simultaneously? And should this admin field be the same configuration used by Story 15 (client-side family package sharing), or is it a separate concept?
