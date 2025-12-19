"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const amenities = [
      // Tiện ích cơ bản & Nhu yếu phẩm
      {
        name: "Máy sấy tóc",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300016/hair_dryer_xspqxy.svg",
      },
      {
        name: "Đồ vệ sinh cá nhân cơ bản",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300021/essentials_lu05hf.svg",
      }, // Essentials
      {
        name: "Dầu gội",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764299996/shampoo_dnu6mk.svg",
      }, // Shampoo
      {
        name: "Xà phòng",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764299994/soap_bm6pl8.svg",
      }, // Soap
      {
        name: "Máy giặt",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764302465/washer_pa5jfz.svg",
      }, // Washer
      {
        name: "Máy sấy khô",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300022/dryer_j2zbt2.svg",
      }, // Dryer
      {
        name: "Móc treo đồ",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300015/hangers_scobgw.svg",
      }, // Hangers
      {
        name: "Bàn là",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300012/iron_uyoq3p.svg",
      }, // Iron
      {
        name: "Tủ quần áo",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300031/closet_u1yste.svg",
      }, // Closet
      {
        name: "Quạt cây",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300000/portable_fans_bykqle.svg",
      }, // fan
      {
        name: "Điều hòa",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764336678/arctic_kuye9i.svg",
      }, // Closet

      // Phòng tắm & Giấc ngủ
      {
        name: "Bồn rửa vệ sinh",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300039/bidet_tab4in.svg",
      }, // Bidet
      {
        name: "Bồn tắm",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300044/bathtub_ijcrpg.svg",
      }, // Bathtub
      {
        name: "Bình nóng lạnh",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300013/hot_water_ynghyn.svg",
      }, // hot water
      {
        name: "Phòng tắm riêng",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300044/bathroom_ss0nfb.svg",
      }, // Bathroom
      {
        name: "Ga trải giường",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300039/bed_linens_rrmdgc.svg",
      }, // Bed Linens
      {
        name: "Gối",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300003/pillows_ifzovw.svg",
      }, // Pillows
      {
        name: "Rèm cửa/Màn che",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764299997/shades_krsjmw.svg",
      }, // Shades

      // Giải trí & Làm việc
      {
        name: "Tivi",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764299991/tv_gkzgje.svg",
      }, // TV-cable
      {
        name: "Wifi",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764299990/wifi_q81a52.svg",
      }, // Wifi
      {
        name: "Sách",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300037/books_flek7m.svg",
      }, // Books
      {
        name: "Đầu đĩa than",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764299999/record_player_ga1cmd.svg",
      }, // Record player
      {
        name: "Hệ thống âm thanh",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764299993/sound_system_iipg1c.svg",
      }, // Sound System
      {
        name: "Máy chơi game",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300028/console_euh5jf.svg",
      }, // Console
      {
        name: "Bàn làm việc",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764299990/workspace_atlooy.svg",
      }, // Workspace

      // Nấu nướng & Thiết bị
      {
        name: "Bếp cơ bản",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300009/kitchen_uowml8.svg",
      }, // Kitchen
      {
        name: "Tủ lạnh",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764299998/refrigerator_d1v5xz.svg",
      }, // Refrigerator
      {
        name: "Lò vi sóng",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300007/microwave_yqlizw.svg",
      }, // Microwave
      {
        name: "Bếp nấu ăn",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764299992/stove_qoseij.svg",
      }, // Stove
      {
        name: "Lò nướng",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300005/oven_wjtbmq.svg",
      }, // Oven
      {
        name: "Máy pha cà phê",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300030/coffee_maker_fyqcex.svg",
      }, // Coffee maker
      {
        name: "Ấm đun nước",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300011/kettle_k28q3m.svg",
      }, // Kettle
      {
        name: "Lò nướng bánh mì",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764299992/toaster_kzn0vz.svg",
      }, // Toaster
      {
        name: "Máy rửa chén",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300026/dishwasher_rx6l1d.svg",
      }, // Dishwasher
      {
        name: "Dụng cụ nướng",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300045/baking_iyftk0.svg",
      }, // Baking sheet
      {
        name: "Máy xay sinh tố",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300038/blender_n3nxju.svg",
      }, // Blender
      {
        name: "Điều hòa",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300050/air_conditioner_zwtrmx.svg",
      }, // air conditioner

      // An toàn & Sức khỏe
      {
        name: "Hộp cứu thương/Y tế",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300019/first_aid_kit_rkelo8.svg",
      }, // First aid kit
      {
        name: "Camera",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764301330/camera_dstyi1.svg",
      }, // Camera
      {
        name: "Bình chữa cháy",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300020/fire_extinguisher_wcjohd.svg",
      }, // Fire Extinguisher
      {
        name: "Máy báo khói",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764299995/smoke_alarm_qc6pzh.svg",
      }, // Smoke alarm
      {
        name: "Máy báo CO2",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300034/carbon_monoxide_alarm_ocqhvf.svg",
      }, // Carbon monoxide alarm
      {
        name: "Cửa khóa điện tử (Keypad)",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300010/keypad_vlvdra.svg",
      }, // Keypad

      // Gia đình & Trẻ em
      {
        name: "Nôi/Cũi",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300027/crib_z3c6cy.svg",
      }, // Crib
      {
        name: "Đồ chơi trẻ em",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300032/child_toys_hzer0n.svg",
      }, // Child-Toys
      {
        name: "Ghế cao cho bé",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300014/high_chair_smni8n.svg",
      }, // High Chair
      {
        name: "Bàn thay tã",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300033/changing_table_vsb0ck.svg",
      }, // Changing table
      {
        name: "Bồn tắm cho bé",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300049/baby_bath_tcxxtw.svg",
      }, // Baby-Bath

      // Thể thao & Giải trí
      {
        name: "Hồ bơi",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300002/pool_wrolzs.svg",
      }, // Pool
      {
        name: "Phòng tập Gym",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300018/fitness_vsadou.svg",
      }, // Fitness
      {
        name: "Bàn bóng bàn",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300002/ping_pong_vbvc2i.svg",
      }, // Ping Pong
      {
        name: "Bàn bi-a",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300000/pooltable_i35mqj.svg",
      }, // Pooltable

      // Khu vực ngoài trời & Đặc biệt
      {
        name: "Sân sau",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300047/backyard_wmyljq.svg",
      }, // Backyard
      {
        name: "Sân thượng/Ban công",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300045/balcony_licw3z.svg",
      }, // Balcony
      {
        name: "Bãi đậu xe",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300004/parking_bvhc5n.svg",
      }, // Parking
      {
        name: "Vườn/Khu vực ngoài trời",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300006/outdoor_j3u731.svg",
      }, // Outdoor
      {
        name: "Nơi đón tiếp/Lối vào riêng",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300024/dropoff_b1jbkr.svg",
      }, // Dropoff
      {
        name: "Hút thuốc",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764299995/smoking_k9ociw.svg",
      }, // Smoking
      {
        name: "Nướng BBQ",
        icon: "https://res.cloudinary.com/dn31ysu8g/image/upload/v1764300041/bbq_grill_vlxq7t.svg",
      }, // Smoking
    ];

    const amenitiesWithTimestamps = amenities.map((amenity) => ({
      ...amenity,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    await queryInterface.bulkInsert("amenities", amenitiesWithTimestamps, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("amenities", null, {});
  },
};
