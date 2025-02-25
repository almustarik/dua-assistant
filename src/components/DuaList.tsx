import { Clock } from 'lucide-react';

const duas = [
  {
    id: 1,
    prayer: 'Fajr',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلاً مُتَقَبَّلاً',
    transliteration: "Allahumma inni as'aluka ilman nafi'an, wa rizqan tayyiban, wa 'amalan mutaqabbalan",
    translation: 'O Allah, I ask You for beneficial knowledge, pure provision, and accepted deeds.',
    time: 'After Fajr Prayer'
  },
  {
    id: 2,
    prayer: 'Dhuhr',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan waqina adhaban-nar",
    translation: 'Our Lord, give us good in this world and good in the Hereafter, and protect us from the torment of the Fire.',
    time: 'After Dhuhr Prayer'
  },
  {
    id: 3,
    prayer: 'Asr',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عِلْمٍ لاَ يَنْفَعُ، وَمِنْ قَلْبٍ لاَ يَخْشَعُ، وَمِنْ نَفْسٍ لاَ تَشْبَعُ، وَمِنْ دَعْوَةٍ لاَ يُسْتَجَابُ لَهَا',
    transliteration: "Allahumma inni a'udhu bika min 'ilmin la yanfa', wa min qalbin la yakhsha', wa min nafsin la tashba', wa min da'watin la yustajabu laha",
    translation: 'O Allah, I seek refuge in You from knowledge that does not benefit, from a heart that does not fear (You), from a soul that is not satisfied, and from a supplication that is not answered.',
    time: 'After Asr Prayer'
  },
  {
    id: 4,
    prayer: 'Maghrib',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ وَأَعُوذُ بِكَ مِنَ النَّارِ',
    transliteration: "Allahumma inni as'alukal-jannah, wa a'udhu bika minan-nar",
    translation: 'O Allah, I ask You for Paradise and seek refuge in You from the Fire.',
    time: 'After Maghrib Prayer'
  },
  {
    id: 5,
    prayer: 'Isha',
    arabic: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ وَلاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللَّهِ',
    transliteration: "Bismillahi, tawakkaltu 'alallahi wa la hawla wa la quwwata illa billah",
    translation: 'In the name of Allah, I put my trust in Allah, and there is no might nor power except with Allah.',
    time: 'After Isha Prayer'
  }
];

function DuaList() {
  return (
    <div className="space-y-6">
      {duas.map((dua) => (
        <div
          key={dua.id}
          className="p-6 transition-all bg-white rounded-lg shadow-md dark:bg-gray-800 hover:shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {dua.time}
              </h3>
            </div>
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
              {dua.prayer}
            </span>
          </div>
          
          <div className="space-y-4">
            <p className="text-2xl leading-loose text-right text-gray-800 font-arabic dark:text-gray-200">
              {dua.arabic}
            </p>
            <p className="italic text-gray-600 dark:text-gray-400">
              {dua.transliteration}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              {dua.translation}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DuaList;