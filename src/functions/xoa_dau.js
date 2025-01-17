export function xoa_dau(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    return str;
}
function show0(d) {
    if (d >= 1 && d < 10) {
        return '0' + d;
    }
    return d;
}

export function format_date(date) {
    var data = new Date(date);
    return `${show0(data.getDate())} / ${show0(
        data.getMonth() + 1,
    )} / ${data.getFullYear()}`;
}

export function format_date2(date) {
    var data = new Date(date);
    return `${data.getFullYear()}-${show0(data.getMonth() + 1)}-${show0(
        data.getDate(),
    )}`;
}

export function checkDataCountry(data, dataCountry) {
    const provide = dataCountry.filter(
        (value) => value.Id == data[data.length - 1],
    );

    const district = provide[0].Districts.filter(
        (value) => value.Id == data[data.length - 2],
    );

    const wards = district[0].Wards.filter(
        (value) => value.Id == data[data.length - 3],
    );

    return (
        data.slice(0, data.length - 3).join(', ') +
        ' , ' +
        wards[0].Name +
        ',  ' +
        district[0].Name +
        ',  ' +
        provide[0].Name
    );
}
