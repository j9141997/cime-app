## URL

https://cime-app.site

## サービス概要

ヒトそれぞれの選択肢を共有するサービス。
文章ではなく選択肢、選択メリット、選択デメリットのみを書き投稿。
無駄な情報がないため、利用者が情報をフィルタリングすることなくサービスを閲覧、利用ができる。

## 開発チーム

- 1 人

## 主な機能

- 選択肢投稿
- 選択肢一覧表示・詳細表示

## サービス開発の目的

- 個人開発による使用技術の幅を拡大
- 外資系 SNS を含め、写真特化、文字数制限など多くの人が利用するサービスには無駄なものを削ぎ落とし、利用者の自由が限られた状態にするものが多いと考えた。よって、選択肢のみのサービスがあっても良いのではないかと考え、開発に至る。

## サービスアーキテクチャ図

![Cime_architecture](https://user-images.githubusercontent.com/50947613/104549959-28c49180-5677-11eb-8276-180f45610a27.png)

## 使用技術

### アーキテクチャ

「アジリティ」「コスト最適化」「スモール構成」「開発スピード」をテーマ設定。
フロントエンドバックエンドどちらともサーバーレスにすることでインフラ周りの管理を極限に抑えつつ、アプリケーション開発に注力できるような環境づくりを目指した。

### 言語

「アジリティ」「開発スピード」の観点からフロントエンド、バックエンドどちらも`TypeScript`を採用。静的型付けによる入力補完の恩恵を受けつつ、ドキュメントとしての側面を持つため、どんなデータを props に渡せば良いかが一目で理解でき、開発効率が上がると考える。また、突然の仕様変更にもコンパイル時にエラーチェックができる。

### フロントエンド

TypeScript と相性の良い`React.js`を採用。また、「開発スピード」「スモール構成」という観点から、ルーティング、SSR など必要かつ面倒な実装を`No Config`で実現できるフロントエンドフレームワークとして`Next.js`を採用。

### フロントエンドデプロイ

「コスト最適化」という観点から`S3 Hosting + CloudFront`を採用。無料枠があり、この構成であれば従量課金制のためコストを最小限に抑えられる。Next.js による SSR は Lambda@edge で行う。これら設定は`ServerlessFramework`を用いることでコードベースでの設定が可能。

### バックエンド(API)デプロイ

`API Gateway + Lambda(REST)` によるサーバーレスアーキテクチャを採用。 「アジリティ」「開発スピード」の観点から、インフラ周りの管理を極限に抑えつつ、アプリケーション開発に注力できるような構成を`ServerlessFramework`を用いて構築。

## 工夫した点

### Interactor と Mapper のよるデータアクセス層の構築

Interactor は API 側からデータを取得する層である。それを各エンドポイントに用意することで、新たにエンドポイントが追加された場合、Interactor を追加するだけで対応でき、仕様追加に対する変更が可能。

## スクリーンショット

<img width="596" alt="スクリーンショット 2021-01-06 8 18 16" src="https://user-images.githubusercontent.com/50947613/103710183-bd841b00-4ff7-11eb-859f-0a59a1b2ddfb.png">
