let date = new Date().toString()
let hari = date.slice(0,3)
let tanggal = date.slice(8,10)
let bulan = date.slice(4,7)
let tahun = date.slice(11,15)

switch(hari){
    case 'Mon':
        hari = "Senin"
        break
    case 'Tue':
        hari = "Selasa"
        break
    case 'Wed':
        hari = "Rabu"
        break
    case 'Thu':
        hari = "Kamis"
        break
    case 'Fri':
        hari = "Jumat"
        break
    case 'Sat':
        hari = "Sabtu"
        break
    case 'Sun':
        hari = "Minggu"
        break
}

switch (bulan){
    case 'Jan':
        bulan = "Januari"
        break
    case 'Feb':
        bulan = "Februari"
        break
    case 'Mar':
        bulan = "Maret"
        break
    case 'Apr':
        bulan = "April"
        break
    case 'May':
        bulan = "Mei"
        break
    case 'Jun':
        bulan = "Juni"
        break
    case 'Jul':
        bulan = "Juli"
        break
    case 'Aug':
        bulan = "Agustus"
        break
    case 'Sep':
        bulan = "September"
        break
    case 'Oct':
        bulan = "Oktober"
        break
    case 'Nov':
        bulan = "November"
        break
    case 'Dec':
        bulan = "Desember"
        break
}

const dateNow = hari + ", " + tanggal + " " + bulan + " " + tahun;

module.exports = dateNow;