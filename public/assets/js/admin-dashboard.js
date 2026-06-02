/**
 * Admin dashboard UI helpers (confirm delete modal).
 */
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("confirmDeleteModal");
  if (!modal) return;

  let pendingForm = null;
  const nameEl = document.getElementById("deleteItemName");
  const confirmBtn = document.getElementById("confirmDelete");
  const cancelBtn = document.getElementById("cancelDelete");

  document.querySelectorAll("form[data-item-name], form.inline-form").forEach((form) => {
    const submitBtn = form.querySelector('button[type="submit"].btn-danger');
    if (!submitBtn) return;

    form.addEventListener("submit", function (e) {
      if (form.dataset.confirmed === "1") {
        form.dataset.confirmed = "0";
        return;
      }
      e.preventDefault();
      pendingForm = form;
      if (nameEl) {
        nameEl.textContent = form.getAttribute("data-item-name") || "mục này";
      }
      modal.classList.add("show");
    });
  });

  if (confirmBtn) {
    confirmBtn.addEventListener("click", function () {
      if (pendingForm) {
        pendingForm.dataset.confirmed = "1";
        pendingForm.submit();
        pendingForm = null;
      }
      modal.classList.remove("show");
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", function () {
      pendingForm = null;
      modal.classList.remove("show");
    });
  }
});
