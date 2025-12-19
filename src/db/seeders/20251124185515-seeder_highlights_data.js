"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const highlights = [
      {
        name: "Được thiết kế để luôn mát mẻ",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764340454/arctic_gg3jyb.svg",
        description:
          "Thổi bay cái nóng với điều hòa không khí, quạt di động và quạt trần.",
      },
      {
        name: "Hủy miễn phí trước",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764340455/calendar_suik44.svg",
        description: "Được hoàn tiền đầy đủ nếu bạn thay đổi kế hoạch.",
      },
      {
        name: "Bể tắm nóng",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764340459/hot_tub_xd9xbo.svg",
        description: "Thư giãn trong bể tắm nước nóng riêng.",
      },
      {
        name: "Nhiều điều để trải nghiệm gần đó",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764340461/location_idybcs.svg",
        description:
          "Khách cho biết khu vực này có rất nhiều điều để khám phá.",
      },
      {
        name: "Thú cưng được chào đón",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764340462/pets_chcyye.svg",
        description:
          "Mang theo người bạn bốn chân của bạn – thú cưng được chào đón tại đây!",
      },
      {
        name: "Tự nhận phòng",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764340465/private_whxa5b.svg",
        description: "Tự nhận phòng với hộp khóa an toàn.",
      },
      {
        name: "Rộng rãi hơn",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764340467/rooms_mb7nbx.svg",
        description:
          "Khách hài lòng với sự rộng rãi của ngôi nhà này – phù hợp cho một kỳ ở thoải mái.",
      },
      {
        name: "Phòng trong căn hộ cho thuê",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764341213/domes_vhuoiq.svg",
        description:
          "Bạn sẽ có phòng riêng trong một ngôi nhà và được sử dụng những khu vực chung.",
      },

      {
        name: "Khu vực sinh hoạt chung",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764340469/shared_tjdtuv.svg",
        description:
          "Bạn sẽ sử dụng chung một số khu vực trong nhà với gia đình và những khách khác của Chủ nhà.",
      },
      {
        name: "Khóa thông minh",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764340471/smart_key_ppnzl8.svg",
        description: "Khóa thông minh cho phép bạn vào nhà bằng mã số.",
      },
      {
        name: "là Chủ nhà siêu cấp",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764340473/super_host_izb5ij.svg",
        description:
          "Chủ nhà siêu cấp là những Chủ nhà dày dạn kinh nghiệm, được đánh giá cao.",
      },

      {
        name: "Bãi biển",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764340474/tropical_tefgnz.svg",
        description: "Nhà này nằm rất gần bãi biển.",
      },

      {
        name: "Giải trí ngoài trời",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764340457/country_side_s45jqq.svg",
        description:
          "Bể bơi và ăn uống ngoài trời thích hợp cho các chuyến đi mùa hè.",
      },
      {
        name: "View biển tuyệt đẹp",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764340476/beach_front_rxwsck.svg",
        description:
          "View biển tuyệt đẹp mà bạn có thể thưởng thức từ nơi này.",
      },
    ];

    const highlightsWithTimestamps = highlights.map((highlight) => ({
      ...highlight,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    await queryInterface.bulkInsert("highlights", highlightsWithTimestamps, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("highlights", null, {});
  },
};
