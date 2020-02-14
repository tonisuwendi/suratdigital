-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 14 Feb 2020 pada 14.28
-- Versi server: 10.4.6-MariaDB
-- Versi PHP: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `suratdigital`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `admin`
--

INSERT INTO `admin` (`id`, `name`, `email`, `password`) VALUES
(1, 'Sukarmin Paijo', 'admin@admin.com', '$2a$10$PkkU91bHVGgwP2KivWD3WO.hka76SzO6.xuzPFctjp.JHGBKpLqhy');

-- --------------------------------------------------------

--
-- Struktur dari tabel `class`
--

CREATE TABLE `class` (
  `id` int(11) NOT NULL,
  `roman` varchar(10) NOT NULL,
  `number` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `class`
--

INSERT INTO `class` (`id`, `roman`, `number`) VALUES
(1, 'i', '1'),
(2, 'ii', '2'),
(3, 'iii', '3'),
(4, 'iv', '4'),
(5, 'v', '5'),
(6, 'vi', '6'),
(7, 'vii', '7'),
(8, 'viii', '8'),
(9, 'ix', '9'),
(10, 'x', '10'),
(11, 'xi', '11'),
(12, 'xii', '12');

-- --------------------------------------------------------

--
-- Struktur dari tabel `letters`
--

CREATE TABLE `letters` (
  `id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `title` varchar(20) NOT NULL,
  `description` text NOT NULL,
  `file` varchar(30) NOT NULL,
  `date` varchar(50) NOT NULL,
  `verify` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `letters`
--

INSERT INTO `letters` (`id`, `user`, `type`, `title`, `description`, `file`, `date`, `verify`) VALUES
(1, 1, 2, 'Bikin KTP', 'Saya mau bikin KTP dulu yekan :v', '', 'Sabtu, 11 Januari 2020', 1),
(2, 1, 1, 'Demam', 'Memberitahukan bahwa putra saya tidak bisa mengikuti pelajaran pada Rabu, 15 Februari 2017 karena sakit. Oleh karena itu, semoga Bapak/Ibu guru yang mengajar di kelas XII B dapat memaklumi dan mengizinkannya.\r\n\r\nDemikian surat izin ini. Atas perhatian yang diberikan Bapak/Ibu Guru, saya mengucapkan terimakasih.', '', 'Rabu, 22 Januari 2020', 1),
(11, 2, 1, 'Demam', 'Ingin memberitahukan bahwa anak saya tersebut tidak bisa mengikuti pelajaran seperti biasa karena sakit. Atas perhatian bapak/ibu guru kami ucapkan terima kasih.', 'img-1579368069876.png', 'Rabu, 22 Januari 2020', 1),
(13, 1, 2, 'Menikah', 'Terlalu lama jomblo membuat saya berinisiatif untuk menikah, dengan ini saya mohon izinnya.', '', 'Rabu, 29 Januari 2020', 1),
(16, 1, 2, 'Menikah', 'Karena pacaran dosa, izinkan saya untuk dihalalkan calon suami saya, saya mohon izin nya .Harap dijadikan periksa.', '', 'Rabu, 29 Januari 2020', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `majors`
--

CREATE TABLE `majors` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `short` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `majors`
--

INSERT INTO `majors` (`id`, `name`, `short`) VALUES
(1, 'Teknik Komputer dan Jaringan', 'tkj'),
(2, 'Multimedia', 'mm');

-- --------------------------------------------------------

--
-- Struktur dari tabel `parents`
--

CREATE TABLE `parents` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `gender` int(11) NOT NULL,
  `nis` int(10) NOT NULL,
  `school` int(11) NOT NULL,
  `avatar` varchar(20) NOT NULL,
  `password` varchar(200) NOT NULL,
  `notif` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `parents`
--

INSERT INTO `parents` (`id`, `name`, `gender`, `nis`, `school`, `avatar`, `password`, `notif`) VALUES
(1, 'Orang Tua Satu', 1, 123, 1, 'male.png', '$2a$10$hTpwECTt0UeVIQKXHVPdkOnYnJc1h2.dyOpOK9dTjw6vxJnhgnhxW', 0),
(2, 'Alexander Grahan Bell', 1, 1300, 1, 'male.png', '$2a$10$n1gahoO2aoweeWjvOD3oZutdISs1tJ6bE.RdjN2ruJz/CfyDyC9f.', 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `schools`
--

CREATE TABLE `schools` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `majors` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ;

--
-- Dumping data untuk tabel `schools`
--

INSERT INTO `schools` (`id`, `name`, `majors`, `class`) VALUES
(1, 'SMK Negeri 1 Cilacap', '{\r\n	\"majors\": [\r\n		{\r\n			\"id_majors\": \"1\",\r\n			\"team\": \"2\"\r\n		},\r\n		{\r\n			\"id_majors\": \"2\",\r\n			\"team\": \"2\"\r\n		},\r\n		{\r\n			\"id_majors\": \"3\",\r\n			\"team\": \"2\"\r\n		},\r\n		{\r\n			\"id_majors\": \"4\",\r\n			\"team\": \"3\"\r\n		},\r\n		{\r\n			\"id_majors\": \"5\",\r\n			\"team\": \"3\"\r\n		},\r\n		{\r\n			\"id_majors\": \"6\",\r\n			\"team\": \"2\"\r\n		},\r\n		{\r\n			\"id_majors\": \"7\",\r\n			\"team\": \"2\"\r\n		},\r\n		{\r\n			\"id_majors\": \"8\",\r\n			\"team\": \"2\"\r\n		}\r\n	]\r\n}', '[ 	{ 		\"id_class\": \"10\" 	}, 	{ 		\"id_class\": \"11\" 	}, 	{ 		\"id_class\": \"11\" 	} ]');

-- --------------------------------------------------------

--
-- Struktur dari tabel `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `gender` int(11) NOT NULL,
  `nis` varchar(10) NOT NULL,
  `school` int(10) NOT NULL,
  `class` int(11) NOT NULL,
  `majors` int(11) NOT NULL,
  `team` varchar(5) NOT NULL,
  `avatar` varchar(20) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `students`
--

INSERT INTO `students` (`id`, `name`, `gender`, `nis`, `school`, `class`, `majors`, `team`, `avatar`, `password`) VALUES
(1, 'Siswa Satu', 1, '123', 1, 12, 1, '1', 'male.png', '$2a$10$PkkU91bHVGgwP2KivWD3WO.hka76SzO6.xuzPFctjp.JHGBKpLqhy'),
(2, 'Andini Asyanti', 2, '1300', 1, 12, 1, '2', 'male.png', '$2a$10$oGGPcuBcgqNtdiV7jb5x3uYSXqD7UBes3nxeao7.ojd9JJRCxaIMC');

-- --------------------------------------------------------

--
-- Struktur dari tabel `teachers`
--

CREATE TABLE `teachers` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `gender` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `school` int(11) NOT NULL,
  `avatar` varchar(20) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `teachers`
--

INSERT INTO `teachers` (`id`, `name`, `gender`, `username`, `school`, `avatar`, `password`) VALUES
(1, 'Guru Satu', 1, 'guru', 1, 'male.png', '$2a$10$QIH/XBmVrACwNT9H2maDGuh1kSeqJwUOspCEFNgE1WVz2IDczq6em');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `letters`
--
ALTER TABLE `letters`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `majors`
--
ALTER TABLE `majors`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `parents`
--
ALTER TABLE `parents`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `class`
--
ALTER TABLE `class`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT untuk tabel `letters`
--
ALTER TABLE `letters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT untuk tabel `majors`
--
ALTER TABLE `majors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `parents`
--
ALTER TABLE `parents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `schools`
--
ALTER TABLE `schools`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
