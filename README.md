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

## 差し替えが必要な仮リンク

以下を正式なGoogle Form URLに差し替えてください。

- `https://forms.gle/REPLACE_WITH_JOIN_FORM`
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
