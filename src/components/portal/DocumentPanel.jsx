import React, { useState } from 'react';

const FOLDERS = [
  { id: 'hr', icon: '📁', label: '인사규정', count: 5 },
  { id: 'form', icon: '📁', label: '업무양식', count: 8 },
  { id: 'meeting', icon: '📁', label: '회의록', count: 12 },
  { id: 'edu', icon: '📁', label: '교육자료', count: 4 },
];

const ALL_FILES = {
  hr: [
    { name: '2026_취업규칙.pdf', uploader: '인사팀', date: '2026-05-10', size: '1.2MB', icon: '📄' },
    { name: '복리후생규정_v3.pdf', uploader: '인사팀', date: '2026-04-22', size: '890KB', icon: '📄' },
    { name: '임직원_행동강령.docx', uploader: '법무팀', date: '2026-03-15', size: '450KB', icon: '📝' },
  ],
  form: [
    { name: '출장신청서_양식.docx', uploader: '총무팀', date: '2026-06-01', size: '120KB', icon: '📝' },
    { name: '지출결의서_양식.xlsx', uploader: '경리팀', date: '2026-05-20', size: '95KB', icon: '📊' },
    { name: '휴가신청서_양식.docx', uploader: '인사팀', date: '2026-05-18', size: '88KB', icon: '📝' },
    { name: '업무보고서_템플릿.pptx', uploader: '기획팀', date: '2026-04-30', size: '2.1MB', icon: '📊' },
  ],
  meeting: [
    { name: '2026_06월_임원회의록.pdf', uploader: '비서실', date: '2026-06-05', size: '340KB', icon: '📄' },
    { name: '2026_05월_전략회의록.pdf', uploader: '기획팀', date: '2026-05-28', size: '280KB', icon: '📄' },
    { name: '2026_Q1_사업계획회의.pdf', uploader: '전략팀', date: '2026-04-10', size: '510KB', icon: '📄' },
  ],
  edu: [
    { name: '신입사원_OJT교육자료.pptx', uploader: '인사팀', date: '2026-05-15', size: '5.4MB', icon: '📊' },
    { name: '보안교육_2026.pdf', uploader: 'IT팀', date: '2026-04-20', size: '1.8MB', icon: '📄' },
  ],
};

const RECENT = [
  { name: '2026_06월_임원회의록.pdf', uploader: '비서실', date: '2026-06-05', icon: '📄' },
  { name: '출장신청서_양식.docx', uploader: '총무팀', date: '2026-06-01', icon: '📝' },
  { name: '2026_취업규칙.pdf', uploader: '인사팀', date: '2026-05-10', icon: '📄' },
  { name: '신입사원_OJT교육자료.pptx', uploader: '인사팀', date: '2026-05-15', icon: '📊' },
  { name: '복리후생규정_v3.pdf', uploader: '인사팀', date: '2026-04-22', icon: '📄' },
];

export default function DocumentPanel() {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const currentFiles = selectedFolder ? ALL_FILES[selectedFolder] : [];
  const filteredFiles = search
    ? Object.values(ALL_FILES).flat().filter((f) => f.name.toLowerCase().includes(search.toLowerCase()))
    : currentFiles;

  return (
    <div style={s.wrap}>
      {toast && <div style={s.toast}>{toast}</div>}

      {/* 상단 */}
      <div style={s.topRow}>
        <h2 style={s.title}>📁 자료실</h2>
        <button style={s.uploadBtn} onClick={() => showToast('⚠️ 업로드 기능은 관리자만 사용 가능합니다.')}>
          ⬆️ 업로드
        </button>
      </div>

      {/* 검색창 */}
      <div style={s.searchWrap}>
        <span style={s.searchIcon}>🔍</span>
        <input
          style={s.searchInput}
          placeholder="파일명으로 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && <button style={s.clearBtn} onClick={() => setSearch('')}>✕</button>}
      </div>

      {search ? (
        /* 검색 결과 */
        <div style={s.panel}>
          <div style={s.panelTitle}>검색 결과 — "{search}" ({filteredFiles.length}건)</div>
          <FileList files={filteredFiles} onDownload={() => showToast('📥 다운로드가 시작됩니다.')} />
        </div>
      ) : (
        <div style={s.grid2}>
          {/* 폴더 트리 */}
          <div style={s.panel}>
            <div style={s.panelTitle}>폴더</div>
            <div style={s.folderList}>
              {FOLDERS.map((f) => (
                <button
                  key={f.id}
                  style={{ ...s.folderBtn, ...(selectedFolder === f.id ? s.folderActive : {}) }}
                  onClick={() => setSelectedFolder(selectedFolder === f.id ? null : f.id)}
                >
                  <span style={s.folderIcon}>{selectedFolder === f.id ? '📂' : '📁'}</span>
                  <span style={s.folderLabel}>{f.label}</span>
                  <span style={s.folderCount}>{f.count}</span>
                </button>
              ))}
            </div>

            {/* 최근 업로드 */}
            <div style={{ marginTop: '20px' }}>
              <div style={s.sectionLabel}>🕐 최근 업로드</div>
              {RECENT.map((f) => (
                <div key={f.name} style={s.recentRow}>
                  <span style={s.fileIconSm}>{f.icon}</span>
                  <div style={s.recentInfo}>
                    <span style={s.recentName}>{f.name}</span>
                    <span style={s.recentMeta}>{f.uploader} · {f.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 파일 리스트 */}
          <div style={s.panel}>
            <div style={s.panelTitle}>
              {selectedFolder ? `${FOLDERS.find((f) => f.id === selectedFolder)?.label} (${currentFiles.length}건)` : '폴더를 선택하세요'}
            </div>
            {selectedFolder ? (
              <FileList files={currentFiles} onDownload={() => showToast('📥 다운로드가 시작됩니다.')} />
            ) : (
              <div style={s.empty}>← 왼쪽 폴더를 클릭하면 파일 목록이 표시됩니다.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function FileList({ files, onDownload }) {
  if (files.length === 0) return <div style={s.empty}>파일이 없습니다.</div>;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {files.map((f) => (
        <div key={f.name} style={s.fileRow}>
          <span style={s.fileIcon}>{f.icon}</span>
          <div style={s.fileInfo}>
            <span style={s.fileName}>{f.name}</span>
            <span style={s.fileMeta}>{f.uploader} · {f.date} · {f.size}</span>
          </div>
          <button style={s.dlBtn} onClick={onDownload} title="다운로드">⬇</button>
        </div>
      ))}
    </div>
  );
}

const s = {
  wrap: { display: 'flex', flexDirection: 'column', gap: '16px' },
  toast: { position: 'fixed', top: '24px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(56,189,248,0.4)', color: 'white', padding: '12px 24px', borderRadius: '12px', fontSize: '14px', zIndex: 9999, boxShadow: '0 8px 32px rgba(0,0,0,0.4)' },
  topRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: '18px', fontWeight: 700, color: 'white', margin: 0 },
  uploadBtn: { padding: '10px 18px', background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.4)', borderRadius: '10px', color: '#34D399', fontSize: '13px', fontWeight: 600, cursor: 'pointer' },
  searchWrap: { position: 'relative', display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '0 14px' },
  searchIcon: { fontSize: '14px', marginRight: '8px' },
  searchInput: { flex: 1, background: 'none', border: 'none', color: 'white', fontSize: '14px', padding: '13px 0', outline: 'none' },
  clearBtn: { background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '14px' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '16px' },
  panel: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '20px' },
  panelTitle: { fontSize: '14px', fontWeight: 600, color: 'white', marginBottom: '14px' },
  folderList: { display: 'flex', flexDirection: 'column', gap: '6px' },
  folderBtn: { display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 14px', background: 'transparent', border: '1px solid transparent', borderRadius: '10px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' },
  folderActive: { background: 'rgba(14,165,233,0.12)', border: '1px solid rgba(14,165,233,0.3)' },
  folderIcon: { fontSize: '18px' },
  folderLabel: { flex: 1, fontSize: '13px', color: 'white', fontWeight: 500 },
  folderCount: { fontSize: '11px', background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', padding: '2px 8px', borderRadius: '20px' },
  sectionLabel: { fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: 600, marginBottom: '10px', marginTop: '4px' },
  recentRow: { display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' },
  fileIconSm: { fontSize: '16px', flexShrink: 0 },
  recentInfo: { flex: 1, overflow: 'hidden' },
  recentName: { display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.7)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  recentMeta: { fontSize: '10px', color: 'rgba(255,255,255,0.3)' },
  fileRow: { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px' },
  fileIcon: { fontSize: '22px', flexShrink: 0 },
  fileInfo: { flex: 1, overflow: 'hidden' },
  fileName: { display: 'block', fontSize: '13px', color: 'white', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  fileMeta: { fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '2px' },
  dlBtn: { background: 'rgba(14,165,233,0.15)', border: '1px solid rgba(14,165,233,0.3)', borderRadius: '8px', color: '#38BDF8', fontSize: '14px', width: '32px', height: '32px', cursor: 'pointer', flexShrink: 0 },
  empty: { textAlign: 'center', padding: '40px 20px', color: 'rgba(255,255,255,0.3)', fontSize: '13px', lineHeight: 1.6 },
};
