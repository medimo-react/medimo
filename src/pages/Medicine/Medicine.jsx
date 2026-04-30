import { useEffect, useMemo } from 'react';
import styles from './Medicine.module.css';
import { FaStar, FaRegStar, FaExclamationTriangle, FaPills, FaClock, FaFolder, FaTrash, FaSearch } from 'react-icons/fa';
import Input from '../../components/Input/Input';
import { useBookmarkStore } from '../../store/bookmarkStore';
import Button from '../../components/Button/Button'
import Container from '../../components/Container/Container'

const FOLDER_COLORS = [
  { bg: '#DBEAFE', text: '#1D4ED8' },
  { bg: '#D1FAE5', text: '#065F46' },
  { bg: '#FEE2E2', text: '#B91C1C' },
  { bg: '#FEF3C7', text: '#92400E' },
  { bg: '#EDE9FE', text: '#5B21B6' },
  { bg: '#FCE7F3', text: '#9D174D' },
  { bg: '#CCFBF1', text: '#0F766E' },
  { bg: '#FED7AA', text: '#C2410C' },
  { bg: '#E0E7FF', text: '#3730A3' },
  { bg: '#F0FDF4', text: '#166534' },
];

const getFolderColor = (name) => {
  const hash = [...name].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return FOLDER_COLORS[hash % FOLDER_COLORS.length];
};

const StarIcon = ({ filled }) =>
  filled
    ? <FaStar size={16} color="#F5A623" />
    : <FaRegStar size={16} color="#9CA3AF" />;

const WarningIcon = () => <FaExclamationTriangle size={16} color="#F59E0B" />;

const PillIcon = () => <FaPills size={20} color="#60A5FA" />;

const ClockIcon = () => <FaClock size={14} color="#9CA3AF" />;

const FolderIcon = () => <FaFolder size={14} />;

const TrashIcon = () => <FaTrash size={14} color="#EF4444" />;

export default function Bookmark() {
  const medicines = useBookmarkStore((s) => s.medicines);
  const loading = useBookmarkStore((s) => s.loading);
  const search = useBookmarkStore((s) => s.search);
  const selectedFolders = useBookmarkStore((s) => s.selectedFolders);
  const filterMode = useBookmarkStore((s) => s.filterMode);
  const openMenuId = useBookmarkStore((s) => s.openMenuId);
  const folderMoveId = useBookmarkStore((s) => s.folderMoveId);
  const folderMoveSelection = useBookmarkStore((s) => s.folderMoveSelection);
  const folderAddId = useBookmarkStore((s) => s.folderAddId);
  const newFolderName = useBookmarkStore((s) => s.newFolderName);
  const customFolders = useBookmarkStore((s) => s.customFolders);

  const fetchBookmarks = useBookmarkStore((s) => s.fetchBookmarks);
  const closeMenu = useBookmarkStore((s) => s.closeMenu);
  const setSearch = useBookmarkStore((s) => s.setSearch);
  const setFilterMode = useBookmarkStore((s) => s.setFilterMode);
  const toggleRowMenu = useBookmarkStore((s) => s.toggleRowMenu);
  const setFolderMoveSelection = useBookmarkStore((s) => s.setFolderMoveSelection);
  const setNewFolderName = useBookmarkStore((s) => s.setNewFolderName);
  const openFolderMove = useBookmarkStore((s) => s.openFolderMove);
  const backFromFolderMove = useBookmarkStore((s) => s.backFromFolderMove);
  const openFolderAdd = useBookmarkStore((s) => s.openFolderAdd);
  const backFromFolderAdd = useBookmarkStore((s) => s.backFromFolderAdd);
  const selectFolderTab = useBookmarkStore((s) => s.selectFolderTab);
  const toggleStar = useBookmarkStore((s) => s.toggleStar);
  const deleteMedicine = useBookmarkStore((s) => s.deleteMedicine);
  const applyFolderMove = useBookmarkStore((s) => s.applyFolderMove);
  const addToNewFolder = useBookmarkStore((s) => s.addToNewFolder);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  const folders = useMemo(
    () => ['전체', ...new Set([...customFolders, ...medicines.flatMap((m) => m.folders)])],
    [customFolders, medicines]
  );

  const folderCounts = useMemo(
    () =>
      folders.reduce((acc, folder) => {
        acc[folder] =
          folder === '전체' ? medicines.length : medicines.filter((m) => m.folders.includes(folder)).length;
        return acc;
      }, {}),
    [folders, medicines]
  );

  const filtered = useMemo(
    () =>
      medicines.filter((m) => {
        const matchSearch =
          m.name.toLowerCase().includes(search.toLowerCase()) ||
          m.engName.toLowerCase().includes(search.toLowerCase());
        const matchFolder = selectedFolders.has('전체') || m.folders.some((f) => selectedFolders.has(f));
        const matchFilter = filterMode === '전체' || m.starred;
        return matchSearch && matchFolder && matchFilter;
      }),
    [medicines, search, selectedFolders, filterMode]
  );

  if (loading) return <div className={styles.page}>불러오는 중...</div>;

  return (
    <Container>
    <div className={styles.page}>
      {openMenuId != null && (
        <div
          className={styles.menuBackdrop}
          aria-hidden
          onPointerDown={(e) => {
            e.preventDefault();
            closeMenu();
          }}
        />
      )}

      <div className={styles.topBar}>
        <div className={styles.searchBox}>
          <FaSearch className={styles.searchIcon} size={16} color="#9CA3AF" />
          <Input
            className={styles.searchInput}
            type="text"
            placeholder="약 이름으로 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.topActions}>
          <Button
            variant='outline'
            className={`${styles.filterBtn} ${filterMode === '전체' ? styles.filterBtnActive : ''}`}
            onClick={() => setFilterMode('전체')}
          >
            전체
          </Button>
          <Button
            variant='outline'
            className={`${styles.favBtn} ${filterMode === '즐겨찾기' ? styles.favBtnActive : ''}`}
            onClick={() => setFilterMode('즐겨찾기')}
          >
            <StarIcon filled={filterMode === '즐겨찾기'} />
            즐겨찾기
          </Button>
        </div>
      </div>

      <div className={styles.folderTabs}>
        {folders.map((folder) => (
          <button
            key={folder}
            className={`${styles.folderTab} ${selectedFolders.has(folder) ? styles.folderTabActive : ''}`}
            onClick={() => selectFolderTab(folder)}
          >
            {folder} <span className={styles.folderCount}>{folderCounts[folder]}</span>
          </button>
        ))}
      </div>

      <div className={styles.tableWrapper}>
        <div className={styles.tableHeader}>
          <span className={styles.colName}>약 이름</span>
          <span className={styles.colCategory}>분류</span>
          <span className={styles.colDosage}>복용법</span>
          <span className={styles.colFolder}>폴더</span>
          <span className={styles.colDate}>저장일</span>
        </div>

        <div className={styles.tableBody}>
          {filtered.length === 0 && (
            <div className={styles.empty}>북마크된 약이 없습니다.</div>
          )}
          {filtered.map((medicine) => (
            <div key={medicine.id} className={styles.row}>
              <div className={styles.colName}>
                <div className={styles.pillIconWrap}>
                  <PillIcon />
                </div>
                <div className={styles.nameInfo}>
                  <span className={styles.medicineName}>
                    {medicine.name}
                    {medicine.starred && <span className={styles.starInline}><StarIcon filled /></span>}
                    {medicine.warning && <span className={styles.warningInline}><WarningIcon /></span>}
                  </span>
                  <span className={styles.engName}>{medicine.engName}</span>
                </div>
              </div>

              <div className={styles.colCategory}>
                <span className={styles.categoryBadge}>{medicine.category}</span>
              </div>

              <div className={styles.colDosage}>
                <span className={styles.dosageText}>{medicine.dosage}</span>
              </div>

              <div className={styles.colFolder}>
                {medicine.folders.map((f) => {
                  const { bg, text } = getFolderColor(f);
                  return (
                    <span key={f} className={styles.folderBadge} style={{ background: bg, color: text }}>
                      {f}
                    </span>
                  );
                })}
              </div>

              <div className={styles.colDate}>
                <ClockIcon />
                <span className={styles.dateText}>{medicine.date}</span>
              </div>

              <div
                className={`${styles.menuCell} ${openMenuId === medicine.id ? styles.menuCellOpen : ''}`}
              >
                <button
                  type="button"
                  className={styles.menuBtn}
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={() => toggleRowMenu(medicine.id)}
                >
                  ···
                </button>
                {openMenuId === medicine.id && (
                  <div
                    className={styles.dropdown}
                    onPointerDown={(e) => e.stopPropagation()}
                  >
                    {folderMoveId === medicine.id ? (
                      <>
                        <button type="button" className={styles.dropdownBack} onClick={backFromFolderMove}>
                          ← 뒤로
                        </button>
                        <div className={styles.dropdownDivider} />
                        {folders.filter((f) => f !== '전체').map((folder) => (
                          <label key={folder} className={styles.dropdownCheckItem}>
                            <input
                              type="checkbox"
                              className={styles.folderCheckbox}
                              checked={folderMoveSelection.includes(folder)}
                              onChange={() =>
                                setFolderMoveSelection((prev) =>
                                  prev.includes(folder)
                                    ? prev.filter((f) => f !== folder)
                                    : [...prev, folder]
                                )
                              }
                            />
                            <FolderIcon />
                            {folder}
                          </label>
                        ))}
                        <div className={styles.dropdownDivider} />
                        <button
                          type="button"
                          className={styles.folderMoveApply}
                          onClick={() => applyFolderMove(medicine)}
                          disabled={folderMoveSelection.length === 0}
                        >
                          적용
                        </button>
                      </>
                    ) : folderAddId === medicine.id ? (
                      <>
                        <button type="button" className={styles.dropdownBack} onClick={backFromFolderAdd}>
                          ← 뒤로
                        </button>
                        <div className={styles.dropdownDivider} />
                        <div className={styles.folderAddWrap}>
                          <Input
                            className={styles.folderAddInput}
                            type="text"
                            placeholder="폴더 이름 입력"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addToNewFolder()}
                            autoFocus
                          />
                          <Button
                            type="button"
                            className={styles.folderAddConfirm}
                            onClick={() => addToNewFolder()}
                            disabled={!newFolderName.trim()}
                          >
                            추가
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Button type="button" className={styles.dropdownItem} onClick={() => toggleStar(medicine)}>
                          <StarIcon filled={medicine.starred} />
                          {medicine.starred ? '즐겨찾기 해제' : '즐겨찾기 추가'}
                        </Button>
                        <Button
                          type="button"
                          className={styles.dropdownItem}
                          onClick={() => openFolderMove(medicine)}
                        >
                          <FolderIcon />
                          폴더 이동
                        </Button>
                        <Button
                          type="button"
                          className={styles.dropdownItem}
                          onClick={() => openFolderAdd(medicine.id)}
                        >
                          <FolderIcon />
                          폴더 추가
                        </Button>
                        <Button
                              type="button"
                              variant='danger'
                          className={`${styles.dropdownItem} ${styles.dropdownItemDanger}`}
                          onClick={() => deleteMedicine(medicine)}
                        >
                          <TrashIcon />
                          삭제
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </Container>  
  );
}
