

const textFilter = {
    BAD_WORDS: ["병신", "ㅄ", "시발", "씨발", "ㅅㅂ", "개쌔끼", "ㅂㅅ", "개새끼"],
  
    isAbusiveOnlyInput(input) {
      const clean = input
        .replace(/[^\wㄱ-ㅎ가-힣\s]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();
  
      if (!clean) return false;
  
      const words = clean.split(" ");
      const remaining = words.filter(word => !textFilter.BAD_WORDS.includes(word));
      return remaining.length === 0;
    }
  };
  
  export default textFilter;
  