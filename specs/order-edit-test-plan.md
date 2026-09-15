# Order Edit Scenarios Test Plan

## Application Overview

Functional and negative test plan for editing florist orders in the authenticated florist portal at https://floristportal-tst.interflorabeta.co.uk/dashboard. The browser session could reach the Auth0 login page but could not authenticate because no florist-portal credentials or saved session were available in the workspace. Therefore, exact control labels, roles, order statuses, permissions, and editable fields must be confirmed during test execution. Use isolated seeded orders and a fresh browser state for every scenario.

## Test Scenarios

### 1. Order Edit Functional Coverage

**Seed:** `tests/seed.spec.ts`

#### 1.1. Open an eligible order and enter edit mode

**File:** `tests/order-edit/open-eligible-order.spec.ts`

**Steps:**
  1. Start from a fresh browser context and sign in with a florist user who has permission to edit orders.
    - expect: Authentication succeeds and the dashboard loads without an authorization error.
  2. Open the order-management area from the dashboard and locate a seeded order  in an editable status.
    -open 'S' prefix orders to edit the order
    - expect: The order is visible in the list or search results with its identifier, customer/recipient summary, date, status, and total.
  3. Open the order details and choose the available edit action.
    - expect: The order edit view opens for the selected order; the order identifier is unchanged and editable controls are clearly distinguishable from read-only values.
  4. Record the initial values of every editable field, the order status, total, and any delivery or fulfilment information.
    - expect: All initial values are available for comparison after the edit.

#### 1.2. Edit recipient and delivery details successfully

**File:** `tests/order-edit/recipient-delivery.spec.ts`

**Steps:**
  1. Open a fresh eligible order in edit mode and change one valid recipient value, one valid delivery address value, and the delivery date or time slot to valid values supported by the environment.
    - expect: Each changed value is accepted and no validation error is shown for valid data.
  2. Save the order.
    - expect: A single success confirmation is displayed, the save control is not left in a loading state, and the order returns to a stable details state.
  3. Reload the order details and reopen edit mode.
    - expect: All recipient and delivery changes persist, while unrelated fields remain unchanged.
  4. Verify the order list or summary view for the same order.
    - expect: The updated summary reflects the changed delivery or recipient information wherever that information is displayed.

#### 1.3. Edit product, quantity, and card message

**File:** `tests/order-edit/product-and-message.spec.ts`

**Steps:**
  1. Open a fresh eligible order in edit mode and change the product or arrangement selection to another available product, adjust quantity within the allowed range, and update the card message with valid content.
    - expect: The selected product, quantity, and message are accepted; any dependent options or totals recalculate without losing other entered values.
  2. Save the order and wait for the save operation to complete.
    - expect: The save succeeds exactly once and the updated product, quantity, and message are shown in the order details.
  3. Reload the page and reopen the order.
    - expect: The saved product, quantity, and message remain persisted and the order identifier is unchanged.
  4. Compare the resulting total, taxes, fees, or discounts with the application's displayed calculation.
    - expect: The displayed amount is internally consistent with the edited product and quantity, and any price change is clearly represented.

#### 1.4. Edit an order without changing data

**File:** `tests/order-edit/no-op-save.spec.ts`

**Steps:**
  1. Open an eligible order in edit mode and do not change any field.
    - expect: The form reflects the current order values and does not report unsaved changes.
  2. Select the save action.
    - expect: The application either prevents a redundant update or completes it safely without changing the order total, status, timestamps, or data.
  3. Review the order history or audit information if exposed by the portal.
    - expect: No misleading field-change entry is created for a no-op save, or the entry explicitly identifies that no values changed.

#### 1.5. Cancel edits and discard unsaved changes

**File:** `tests/order-edit/cancel-edits.spec.ts`

**Steps:**
  1. Open an eligible order in edit mode and change several fields without saving.
    - expect: The form shows the changed values and indicates that unsaved changes exist, if that pattern is supported.
  2. Use the cancel, back, or close action.
    - expect: The application asks for confirmation before discarding changes when appropriate.
  3. Confirm discard and reopen the same order.
    - expect: The original values are restored; none of the unsaved values appear in the order details, list, total, or history.
  4. Repeat the flow and choose to remain on the edit page when the confirmation is offered.
    - expect: The edit form remains open and all unsaved values are preserved.

#### 1.6. Validate required, malformed, and boundary values

**File:** `tests/order-edit/validation.spec.ts`

**Steps:**
  1. Open an eligible order in edit mode and clear each required editable field one at a time, attempting to save after each change.
    - expect: The save is blocked for each missing required value, an actionable validation message identifies the field, and valid previously entered values are retained.
  2. Enter malformed values such as an invalid email, phone number, postcode, unsupported date, invalid time slot, or prohibited characters in the applicable fields.
    - expect: The invalid value is rejected or a clear validation message is shown; the application does not submit malformed data.
  3. Test minimum, maximum, zero, negative, decimal, and very large values for quantity or other numeric fields where applicable.
    - expect: Only values within the documented business limits are accepted; boundary behavior is consistent and does not produce incorrect totals.
  4. Correct all invalid values and save.
    - expect: The order saves successfully and contains only the corrected values.

#### 1.7. Prevent editing orders in non-editable states

**File:** `tests/order-edit/status-locking.spec.ts`

**Steps:**
  1. From a fresh session, locate one order for each relevant non-editable status, such as cancelled, completed, dispatched, or otherwise locked, using environment data.
    - expect: Each status is visible and can be distinguished from an editable order.
  2. Open each non-editable order.
    - expect: The edit action is hidden or disabled, or the edit view is explicitly read-only with a clear reason.
  3. Attempt to reach or submit an edit operation through any available direct UI path.
    - expect: The server rejects the update safely; no order field, total, status, fulfilment state, or audit record is modified.

#### 1.8. Enforce role-based access to order editing

**File:** `tests/order-edit/permissions.spec.ts`

**Steps:**
  1. Sign in as a user who can view orders but is not permitted to edit them, then open an eligible order.
    - expect: The user can view only the data allowed by their role and cannot access an enabled edit action.
  2. Attempt to use a direct order-edit URL or submit an update if the UI exposes such a route.
    - expect: Access is denied with the application's standard authorization response and no data is changed.
  3. Sign in as an authorized florist user and repeat the same order flow.
    - expect: The authorized user can edit only orders within the permitted florist or group scope.

#### 1.9. Handle concurrent edits without silently overwriting data

**File:** `tests/order-edit/concurrency.spec.ts`

**Steps:**
  1. Open the same eligible order in edit mode in two independent browser contexts.
    - expect: Both contexts load the same initial version or revision information.
  2. In the first context, change one field and save successfully.
    - expect: The first update succeeds and the changed value is visible after reload.
  3. In the second context, change a different field using the stale form and save.
    - expect: The application either merges changes according to documented rules or detects the stale version and asks the user to reload or resolve the conflict.
  4. Reload the order in both contexts.
    - expect: No previously saved change is silently lost, and the final order state matches the application's conflict-handling rule.

#### 1.10. Recover safely from save failure or expired session

**File:** `tests/order-edit/save-failure.spec.ts`

**Steps:**
  1. Open an eligible order, make valid changes, and simulate a network failure or unavailable update response using the test environment controls.
    - expect: The application shows a clear failure message, stops showing progress, and does not claim that the order was saved.
  2. Restore connectivity and retry the save once.
    - expect: The retry succeeds without creating duplicate updates or duplicate notifications, and the changes persist after reload.
  3. Repeat with an expired or revoked session if the environment supports it.
    - expect: The user is redirected to authentication or shown an authorization error; unsaved data is handled according to the application's documented recovery behavior and the order remains unchanged.

#### 1.11. Verify totals, downstream effects, and audit history

**File:** `tests/order-edit/downstream-effects.spec.ts`

**Steps:**
  1. Open a fresh eligible order and change fields that affect price, delivery, fulfilment, or customer communication.
    - expect: The form identifies any dependent recalculation or downstream effect before save, where applicable.
  2. Save the order and capture the resulting total, status, delivery details, and visible notification or fulfilment indicators.
    - expect: All dependent values are recalculated consistently and no unrelated status or fulfilment state changes unexpectedly.
  3. Open the order history, activity, or audit view.
    - expect: The edit records the acting user, timestamp, order identifier, changed fields or an equivalent audit representation, and previous/new values where the product supports them.
  4. Confirm that editing does not create duplicate orders or duplicate fulfilment/payment actions.
    - expect: Only the original order exists and downstream actions occur according to the documented business rule.

#### 1.12. Verify navigation, refresh, and browser back behavior during editing

**File:** `tests/order-edit/navigation-resilience.spec.ts`

**Steps:**
  1. Open an eligible order in edit mode, make unsaved changes, and refresh the browser.
    - expect: The application warns about unsaved changes or restores the form according to its documented behavior; it must not silently present a false saved state.
  2. Open edit mode again, make unsaved changes, and use the browser back button or navigate to the order list.
    - expect: The user receives an appropriate discard warning or the application preserves the draft as documented.
  3. Return to the order and complete a valid save.
    - expect: The order saves once, the list and detail views are synchronized, and no stale draft overwrites the saved values.
