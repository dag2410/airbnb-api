/* global Chart */
(function () {
  const chartInstances = {};

  function destroyCharts() {
    Object.keys(chartInstances).forEach((key) => {
      if (chartInstances[key]) {
        chartInstances[key].destroy();
        delete chartInstances[key];
      }
    });
  }

  function formatVnd(value) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(value || 0);
  }

  function baseOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "top" },
        tooltip: { mode: "index", intersect: false },
      },
    };
  }

  window.initAdminAnalytics = function (charts) {
    destroyCharts();

    const colors = {
      primary: "#3a86ff",
      primaryLight: "rgba(58, 134, 255, 0.15)",
      secondary: "#8338ec",
      success: "#4caf50",
      warning: "#ffbe0b",
      danger: "#ff006e",
      palette: ["#3a86ff", "#ff006e", "#8338ec", "#fb5607", "#ffbe0b", "#4caf50"],
    };

    // 1. Doanh thu theo thời gian
    const revenueCtx = document.getElementById("revenueChart");
    if (revenueCtx && charts.revenue) {
      chartInstances.revenue = new Chart(revenueCtx, {
        type: "line",
        data: {
          labels: charts.revenue.labels,
          datasets: [
            {
              label: "Kỳ hiện tại",
              data: charts.revenue.current,
              borderColor: colors.primary,
              backgroundColor: colors.primaryLight,
              fill: true,
              tension: 0.35,
            },
            {
              label: "Kỳ trước",
              data: charts.revenue.previous,
              borderColor: colors.secondary,
              backgroundColor: "rgba(131, 56, 236, 0.08)",
              fill: true,
              tension: 0.35,
              borderDash: [6, 4],
            },
          ],
        },
        options: {
          ...baseOptions(),
          scales: {
            y: {
              beginAtZero: true,
              ticks: { callback: (v) => formatVnd(v) },
            },
          },
          plugins: {
            ...baseOptions().plugins,
            tooltip: {
              callbacks: {
                label: (ctx) =>
                  `${ctx.dataset.label}: ${formatVnd(ctx.parsed.y)}`,
              },
            },
          },
        },
      });
    }

    // 2. Bookings theo thời gian
    const bookingsCtx = document.getElementById("bookingsChart");
    if (bookingsCtx && charts.bookings) {
      chartInstances.bookings = new Chart(bookingsCtx, {
        type: "bar",
        data: {
          labels: charts.bookings.labels,
          datasets: [
            {
              label: "Kỳ hiện tại",
              data: charts.bookings.current,
              backgroundColor: colors.primary,
              borderRadius: 6,
            },
            {
              label: "Kỳ trước",
              data: charts.bookings.previous,
              backgroundColor: "rgba(131, 56, 236, 0.6)",
              borderRadius: 6,
            },
          ],
        },
        options: {
          ...baseOptions(),
          scales: { y: { beginAtZero: true } },
        },
      });
    }

    // 3. User mới
    const usersCtx = document.getElementById("newUsersChart");
    if (usersCtx && charts.newUsers) {
      chartInstances.newUsers = new Chart(usersCtx, {
        type: "line",
        data: {
          labels: charts.newUsers.labels,
          datasets: [
            {
              label: "User đăng ký mới",
              data: charts.newUsers.data,
              borderColor: colors.success,
              backgroundColor: "rgba(76, 175, 80, 0.15)",
              fill: true,
              tension: 0.35,
            },
          ],
        },
        options: { ...baseOptions(), scales: { y: { beginAtZero: true } } },
      });
    }

    // 4. Trạng thái booking
    const statusCtx = document.getElementById("bookingStatusChart");
    if (statusCtx && charts.bookingStatus) {
      chartInstances.bookingStatus = new Chart(statusCtx, {
        type: "doughnut",
        data: {
          labels: charts.bookingStatus.labels,
          datasets: [
            {
              data: charts.bookingStatus.data,
              backgroundColor: colors.palette,
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: "right" } },
          cutout: "62%",
        },
      });
    }

    // 5. Doanh thu theo cổng thanh toán
    const providerCtx = document.getElementById("paymentProviderChart");
    if (providerCtx && charts.paymentProvider) {
      chartInstances.paymentProvider = new Chart(providerCtx, {
        type: "pie",
        data: {
          labels: charts.paymentProvider.labels,
          datasets: [
            {
              data: charts.paymentProvider.data,
              backgroundColor: colors.palette,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "bottom" },
            tooltip: {
              callbacks: {
                label: (ctx) =>
                  `${ctx.label}: ${formatVnd(ctx.parsed)}`,
              },
            },
          },
        },
      });
    }

    // 6. Trạng thái payment
    const payStatusCtx = document.getElementById("paymentStatusChart");
    if (payStatusCtx && charts.paymentStatus) {
      chartInstances.paymentStatus = new Chart(payStatusCtx, {
        type: "bar",
        data: {
          labels: charts.paymentStatus.labels,
          datasets: [
            {
              label: "Số giao dịch",
              data: charts.paymentStatus.data,
              backgroundColor: [colors.warning, colors.success, colors.danger],
              borderRadius: 8,
            },
          ],
        },
        options: {
          ...baseOptions(),
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true } },
        },
      });
    }

    // 7. Top thành phố
    const citiesCtx = document.getElementById("topCitiesChart");
    if (citiesCtx && window.topCitiesData) {
      chartInstances.cities = new Chart(citiesCtx, {
        type: "bar",
        data: {
          labels: window.topCitiesData.labels,
          datasets: [
            {
              label: "Số booking",
              data: window.topCitiesData.data,
              backgroundColor: colors.primary,
              borderRadius: 6,
            },
          ],
        },
        options: {
          indexAxis: "y",
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { x: { beginAtZero: true } },
        },
      });
    }

    // 8. Top phòng (doanh thu)
    const roomsCtx = document.getElementById("topRoomsChart");
    if (roomsCtx && window.topRoomsChartData) {
      chartInstances.topRooms = new Chart(roomsCtx, {
        type: "bar",
        data: {
          labels: window.topRoomsChartData.labels,
          datasets: [
            {
              label: "Doanh thu",
              data: window.topRoomsChartData.revenue,
              backgroundColor: colors.secondary,
              borderRadius: 6,
              yAxisID: "y",
            },
            {
              label: "Số booking",
              data: window.topRoomsChartData.bookings,
              backgroundColor: colors.primary,
              borderRadius: 6,
              yAxisID: "y1",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              type: "linear",
              position: "left",
              beginAtZero: true,
              ticks: { callback: (v) => formatVnd(v) },
            },
            y1: {
              type: "linear",
              position: "right",
              beginAtZero: true,
              grid: { drawOnChartArea: false },
            },
          },
        },
      });
    }
  };

  document.addEventListener("DOMContentLoaded", function () {
    const rangeSelect = document.getElementById("dateRange");
    const customStart = document.getElementById("customDateStart");
    const customEnd = document.getElementById("customDateEnd");
    const customWrap = document.getElementById("customDateWrap");

    if (rangeSelect) {
      rangeSelect.addEventListener("change", function () {
        if (customWrap) {
          customWrap.style.display =
            this.value === "custom" ? "flex" : "none";
        }
      });
      if (customWrap && rangeSelect.value === "custom") {
        customWrap.style.display = "flex";
      }
    }
  });
})();
