export interface EssayPhrase {
  en: string
  zh: string
}

export interface EssayCategory {
  title: string
  phrases: EssayPhrase[]
}

export const essayCategories: EssayCategory[] = [
  {
    title: "Introduction & Opening Phrases (开头与引入)",
    phrases: [
      { en: 'As the saying goes, "Where there is a will, there is a way."', zh: "正如常言道，'有志者事竟成。'" },
      { en: "With the rapid development of technology/society...", zh: "随着科技/社会的飞速发展..." },
      { en: "Recently, the problem of ... has become more and more serious.", zh: "最近，...的问题变得越来越严重。" },
      { en: "I am writing to share my views on...", zh: "我写这封信是为了分享我对...的看法。" },
    ]
  },
  {
    title: "Connecting & Developing Ideas (衔接与发展)",
    phrases: [
      { en: "First of all / To begin with...", zh: "首先 / 首先从...开始" },
      { en: "What's more / In addition / Moreover...", zh: "此外 / 而且 / 并且" },
      { en: "Last but not least...", zh: "最后但同样重要的..." },
      { en: "On one hand... on the other hand...", zh: "一方面...另一方面..." },
      { en: "Compared with..., ... is much better.", zh: "与...相比，...要好得多。" },
    ]
  },
  {
    title: "Advanced Sentence Structures (高分句型)",
    phrases: [
      { en: "Not only... but also...", zh: "不仅...而且... (用于增加信息量)" },
      { en: "Only in this way can we solve the problem.", zh: "倒装句 (Only + 状语放在句首，用于加强语气)" },
      { en: "It is + adj. + for sb. to do sth.", zh: "It is important for us to protect the environment." },
      { en: "I find it + adj. + to do sth.", zh: "I find it meaningful to help others." },
      { en: "...is so [adj.] that...", zh: "如此...以至于... (表示结果)" },
    ]
  },
  {
    title: "Expressing Feelings & Lessons (表达感受与收获)",
    phrases: [
      { en: "I have learned a lot from this experience.", zh: "我从这次经历中学到了很多。" },
      { en: "It taught me the importance of...", zh: "它教会了我...的重要性。" },
      { en: "I felt very proud of myself/team.", zh: "我为自己/团队感到自豪。" },
      { en: "Nothing is more important than...", zh: "没有什么比...更重要了。" },
    ]
  },
  {
    title: "Conclusion & Ending (结尾与总结)",
    phrases: [
      { en: "In short / In a word / In conclusion...", zh: "总之 / 简而言之" },
      { en: "All in all, ... is of great significance to us.", zh: "总而言之，...对我们具有重大意义。" },
      { en: "Let's take action to make our world a better place.", zh: "让我们行动起来，让世界变得更美好。" },
      { en: "I am looking forward to your early reply.", zh: "期待您的早日回复。(信件结尾)" },
    ]
  }
]
