export type Song = {
  name: string
  artist: string
}

/**
 * Tracks from "ifwt". Hand-listed rather than fetched: Spotify's Client
 * Credentials flow returns playlist metadata but 403s on /tracks, so there
 * is no way to pull these at build time without a user OAuth round trip.
 * Update by hand when the playlist changes.
 */
export const PLAYLIST_ID = '5MgutE5lg2nyijjaxpYrbn'

export const songs: Song[] = [
  { name: 'Rakhlo Tum Chupaake', artist: 'Arpit Bala, Adil' },
  { name: 'Ik Kudi', artist: 'wolf.cryman, Arpit Bala' },
  { name: 'See You Again (feat. Kali Uchis)', artist: 'Tyler, The Creator, Kali Uchis' },
  { name: 'Kabhi Kabhi Aditi', artist: 'Rashid Ali' },
  { name: 'Ain\'t No Sunshine', artist: 'Bill Withers' },
  { name: 'E85', artist: 'Don Toliver' },
  { name: 'One Dance', artist: 'Drake, Wizkid, Kyla' },
  { name: 'Hotline Bling', artist: 'Drake' },
  { name: 'BURN', artist: '¥$, Kanye West, Ty Dolla $ign' },
  { name: 'The Color Violet', artist: 'Tory Lanez' },
  { name: 'I Really Do...', artist: 'Karan Aujla, Ikky' },
  { name: 'For A Reason', artist: 'Karan Aujla, Ikky' },
  { name: 'You\'re U Tho', artist: 'Karan Aujla, Ikky' },
  { name: 'What...?', artist: 'Karan Aujla, Ikky' },
  { name: 'Softly', artist: 'Karan Aujla, Ikky' },
  { name: 'Bachke Bachke (feat. Yarah)', artist: 'Karan Aujla, Ikky, Yarah' },
  { name: 'Reminder', artist: 'The Weeknd' },
  { name: 'Timeless (feat Playboi Carti)', artist: 'The Weeknd, Playboi Carti' },
  { name: 'Thinkin Bout You', artist: 'Frank Ocean' },
  { name: 'White Ferrari', artist: 'Frank Ocean' },
  { name: 'Novacane', artist: 'Frank Ocean' },
  { name: 'Pyramids', artist: 'Frank Ocean' },
  { name: 'Ivy', artist: 'Frank Ocean' },
  { name: 'Bad Religion', artist: 'Frank Ocean' },
  { name: 'Forrest Gump', artist: 'Frank Ocean' },
  { name: 'Swim Good', artist: 'Frank Ocean' },
  { name: 'No Pole', artist: 'Don Toliver' },
  { name: 'Not You Too (feat. Chris Brown)', artist: 'Drake, Chris Brown' },
  { name: 'sdp interlude', artist: 'Travis Scott' },
  { name: 'Chanel', artist: 'Frank Ocean' },
  { name: 'NOKIA', artist: 'Drake' },
  { name: 'luther (with sza)', artist: 'Kendrick Lamar, SZA' },
  { name: 'GREECE (feat. Drake)', artist: 'DJ Khaled, Drake' },
  { name: 'LUNCH', artist: 'Billie Eilish' },
  { name: 'New Person, Same Old Mistakes', artist: 'Tame Impala' },
  { name: 'With You', artist: 'AP Dhillon' },
  { name: 'Popular (with Playboi Carti & Madonna) - From The Idol Vol. 1 (Music from the HBO Original Series)', artist: 'The Weeknd, Playboi Carti, Madonna' },
  { name: 'Love Yourself', artist: 'Justin Bieber' },
  { name: 'Bad Habit', artist: 'Steve Lacy' },
  { name: 'Chicago', artist: 'Michael Jackson' },
  { name: 'Loser', artist: 'Tame Impala' },
  { name: 'Let It Happen', artist: 'Tame Impala' },
  { name: 'The Less I Know The Better', artist: 'Tame Impala' },
  { name: 'Sprinter', artist: 'Dave, Central Cee' },
  { name: 'After The Storm (feat. Tyler, The Creator & Bootsy Collins)', artist: 'Kali Uchis, Tyler, The Creator, Bootsy Collins' },
  { name: 'Janice STFU', artist: 'Drake' },
  { name: 'Maharani', artist: 'Karun, Lambo Drive, Arpit Bala, GHILDIYAL' },
  { name: 'Plastic Beach (feat. Mick Jones and Paul Simonon)', artist: 'Gorillaz, Mick Jones, Paul Simonon' },
  { name: 'American Pie', artist: 'Don McLean' },
  { name: 'MUTT', artist: 'Leon Thomas' },
  { name: 'Sidewalks', artist: 'The Weeknd, Kendrick Lamar' },
  { name: 'Earrings', artist: 'Malcolm Todd' },
  { name: 'Hangover', artist: 'Salman Khan, Meet Bros Anjjan, Shreya Ghoshal, Kumaar' },
  { name: 'Dil Bechara', artist: 'A.R. Rahman' },
  { name: 'O Humdum Suniyo Re', artist: 'A.R. Rahman, KK, Shaan, Kunal, Pravin Mani, Gulzar' },
  { name: 'Falak Tak', artist: 'Vishal-Shekhar, Udit Narayan, Mahalakshmi Iyer, Kausar Munir' },
  { name: 'Masakali', artist: 'Mohit Chauhan, A.R. Rahman, Prasoon Joshi' },
  { name: 'Tu Hi Meri Shab Hai', artist: 'KK' },
  { name: 'Woh Ladki Hai Kahan', artist: 'Shaan, Kavita Krishnamurthy' },
  { name: 'american wedding (Hotel California)', artist: 'dopuu' },
  { name: 'Wiseman', artist: 'dopuu' },
  { name: 'Nights', artist: 'Frank Ocean' },
  { name: 'Tareefan', artist: 'Karan Aujla, DIVINE' },
  { name: 'Coming Down', artist: 'The Weeknd' },
]
