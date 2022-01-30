function tourForm(tour) {
    return {
        ma: tour.ma,
        ten: tour.ten,
        thoiGian: tour.thoiGian,
        ngayKhoiHanh: tour.ngayKhoiHanh,
        noiKhoiHanh: tour.noiKhoiHanh,
        phuongTien: tour.phuongTien,
        giaHienTai: tour.giaHienTai,
        giaCu: tour.giaCu,
        diaDiem: tour.diaDiem,
        hinhAnh: tour.hinhAnh,
        chiTiet: tour.chiTiet,
    };
}
exports.tourForm = tourForm;

userForm = function (user, isGetToken = false) {
    return {
        ma: user.ma,
        ten: user.ten || '',
        cccd: user.cccd || '',
        gioiTinh: user.gioiTinh || 'nam',
        soDT: user.soDT || '',
        email: user.email || '',
        diaChi: user.diaChi || '',
        vai: user.vai || 'CLIENT',
        token: isGetToken ? user.token : null,
    };
};
exports.userForm = userForm;

formDatVe = function formDatVe(ve, tour) {
    return {
        ma: ve.ma,
        thoiGianDat: ve.thoiGianDat,
        tour: tour ? tourForm(tour) : { error: 'No tour data' },
        thongTin: userForm(ve),
        ghiChu: ve.ghiChu,
    };
};

exports.formDatVe = formDatVe;
