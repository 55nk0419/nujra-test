# NUJRA GitHub Pages Website

NUJRAホームページの試作版です。

## 構成

- `index.html`: ホーム
- `about.html`: NUJRAとは
- `join.html`: 入会案内
- `resources.html`: お役立ち情報
- `contact.html`: お問い合わせ
- `css/style.css`: デザイン
- `js/main.js`: 検索・絞り込み・JSON表示
- `data/members.json`: メンバー情報
- `data/resources.json`: お役立ち情報

## 通常更新

- お役立ち情報の追加: `data/resources.json`
- メンバー情報の追加: `data/members.json`

## フォームURL

入会フォームは以下に設定済みです。

- `https://forms.gle/iMfgbsePX4yDNfAm9`

以下は正式なGoogle Form URLに差し替えてください。

- `https://forms.gle/REPLACE_WITH_CONTACT_FORM`
- `https://forms.gle/REPLACE_WITH_LEAVE_FORM`

## GitHub Pages

Settings > Pages > Deploy from a branch > main > /root


## v4 update

- Removed search box and category filter from the resources page.
- Resource items are now simple direct-click cards.
- Cards with no URL show `準備中`.


## v5 update

- Updated the resources page notice text.
- Added Japanese line-breaking rules to reduce awkward line breaks such as `しま / す`.
- Added CSS/JS cache-busting query strings `?v=5`.


## v6 update

- Home hero title now highlights the NUJRA acronym letters: N, U, J, R, A.
- Updated CSS/JS cache-busting query strings to `?v=6`.


## v7 update

- Fixed NUJRA acronym highlighting in the Home hero title.
- Changed `.hero-title span` to `.hero-title .title-line` to avoid affecting nested acronym letters.
- Strengthened acronym-letter styling with `!important` and `-webkit-text-fill-color`.
- Updated cache-busting query strings to `?v=7`.


## v8 update

- Fixed mobile title wrapping.
- Wrapped full words (`Northwestern`, `University`, etc.) in `.title-word` so the acronym letters do not break away from the words.
- Added mobile-specific hero title sizing.
- Updated cache-busting query strings to `?v=8`.


## v9 update

- Removed per-letter highlighting inside the main title because it caused unstable mobile line breaks.
- Added a separate NUJRA accent badge above the title.
- The main title now keeps clean line starts:
  - Northwestern University
  - Japanese Researcher Association
- Updated cache-busting query strings to `?v=9`.


## v10 update

- Changed the Home hero title to a two-column acronym grid.
- The NUJRA letters are now blue and vertically aligned.
- The full words start at the same x-position, avoiding jagged starts.
- Removed the purple acronym badge.
- Updated cache-busting query strings to `?v=10`.


## v11 update

- Added `members.html`.
- Added `メンバー` to the main menu.
- Updated `data/members.json` with organizers, former organizers/co-founders, and 2024 members based on the supplied old NUJRA page text.
- Past member archive is shown as `準備中`.
- Updated cache-busting query strings to `?v=11`.


## v12 update

- Removed the internal publication-check notice from `members.html`.
- Removed initial avatar badges from member cards.
- Fixed member card overflow by allowing long affiliations and descriptions to wrap inside cards.
- Updated cache-busting query strings to `?v=12`.


## v13 update

- Unified content width across pages.
- Removed the old full-bleed width behavior from `.section-soft`.
- Made card grids responsive with `auto-fit` and safe minimum widths.
- Added overflow protection to reduce horizontal scrolling on narrow screens and non-standard monitors.
- Updated cache-busting query strings to `?v=13`.


## v14 update

- Fixed hero title styling so only the first letter of each word is blue.
- Ensured the remainder of each word is black.
- Corrected title alignment so N/U/J/R/A no longer look duplicated or staggered.
- Updated cache-busting query strings to `?v=14`.


## v15 update

- Fixed Home hero acronym alignment.
- The blue first-letter column now has a fixed width and centered letters.
- The black second-letter text now starts at a consistent x-position with a small gap.
- Updated cache-busting query strings to `?v=15`.


## v16 update

- Fixed duplicated first letters in the Home hero title.
- The left blue column is `N U J R A`; the right black column now starts from the second letter:
  - orthwestern
  - niversity
  - apanese
  - esearcher
  - ssociation
- Updated cache-busting query strings to `?v=16`.


## v17 update

- Added global mobile overflow protection.
- Replaced overly strict mobile `word-break: keep-all` behavior with safer wrapping on small screens.
- Forced grids, cards, sections, hero blocks, and member cards to stay within viewport width.
- Added safer wrapping for long English affiliations and URLs.
- Updated cache-busting query strings to `?v=17`.


## v18 update

- Added `resources/ssn.html` as the first full resource article.
- Changed `data/resources.json` from broad category cards to article-style entries.
- SSN article is clickable; other planned articles remain `準備中`.
- Added article-specific CSS.
- Updated cache-busting query strings to `?v=18`.


## v19 update

- Added `alumni.html`.
- Added `data/alumni.json` using the supplied past-member list.
- Replaced the `過去メンバー 準備中` block in `members.html` with a link to the alumni page.
- Updated cache-busting query strings to `?v=19`.


## v19 folder deployment

Upload the entire `v19/` folder to the repository root.

Test URL:
https://55nk0419.github.io/nujra-test/v19/

All navigation links are relative and stay inside the `v19/` folder.


## v20 folder deployment

Upload the entire `v20/` folder to the repository root.

Test URL:
https://55nk0419.github.io/nujra-test/v20/

Update:
- Strengthened sticky top navigation.
- Added blur background and subtle shadow to the menu bar.
- Added scroll-margin for section anchors.


## v21 folder deployment

Upload the entire `v21/` folder to the repository root.

Test URL:
https://55nk0419.github.io/nujra-test/v21/

Update:
- Changed the top navigation from sticky to fixed.
- Added body padding so content does not hide underneath the fixed header.
- Updated mobile dropdown position under the fixed header.


## v22 folder deployment

Upload the entire `v22/` folder to the repository root.

Test URL:
https://55nk0419.github.io/nujra-test/v22/

Update:
- Moved the previous organizers to `元幹事・創設メンバー`.
- Set the new organizers to 上田 潤 / Jun Ueda, 乾 洋勉 / Hiroyasu Inui, 北 香織 / Kahori Kita, and 清田 直樹 / Naoki Kiyota.
- Corrected 増原 香織 / Kaori Masuhara to 北 香織 / Kahori Kita.
- Updated CSS/JS cache-busting query strings to `?v=28`.

## v25 folder deployment

Upload the entire `v25/` folder to the repository root.

Test URL:
https://55nk0419.github.io/nujra-test/v25/

Update:
- Connected the 入会フォーム links to `https://forms.gle/iMfgbsePX4yDNfAm9`.
- Updated CSS/JS cache-busting query strings to `?v=28`.
- Updated temporary-form wording so only the remaining 問い合わせフォーム and 退会フォーム are marked as pending.

## v24 changes

- Updated 入会フォーム links to `https://forms.gle/iMfgbsePX4yDNfAm9`.
- Updated CSS/JS cache-busting query strings to `?v=28`.

## v25 changes

- Added 増原 香織 / Kahori Masuhara to 2024年度メンバー.
- Set 幹事 entry 北 香織 / Kahori Kita to 所属確認中 / 説明文準備中.
- Updated CSS/JS cache-busting query strings to `?v=28`.


## v26 update

- Added housing/living article: `resources/chicago-housing.html`.
- Updated `data/resources.json` so the housing article appears in the resources list.
- Added article figure styling to `css/style.css`.
- Bumped cache query strings to `?v=28`.
- Image file name: `chicago-housing-map.png`.
- Intended image path for GitHub Pages: `/images/chicago-housing-map.png`.
- The article page references the image as `../../images/chicago-housing-map.png` from `v26/resources/chicago-housing.html`.

## v27 update

- Added child/school article: `resources/chicago-schools-daycare.html`.
- Updated `data/resources.json` so the 小学校・保育園 article appears as a clickable resource card.
- Bumped cache query strings to `?v=28`.

Upload the entire `v27/` folder to the repository root.

Test URL:
https://55nk0419.github.io/nujra-test/v27/


## v28 update

- Added summer camp article: `resources/chicago-summer-camp.html`.
- Updated `data/resources.json` so the サマーキャンプ article appears as a clickable resource card.
- Bumped cache query strings to `?v=28`.

Upload the entire `v28/` folder to the repository root.

Test URL:
https://55nk0419.github.io/nujra-test/v28/
