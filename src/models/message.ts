class Message {
    from_userId: string;
    to_userId: string;
    content: string;
  
    constructor({ from_userId, to_userId, content }: { from_userId: string; to_userId: string; content: string }) {
      this.from_userId = from_userId;
      this.to_userId = to_userId;
      this.content = content;
    }
  }
  
  export { Message };
  