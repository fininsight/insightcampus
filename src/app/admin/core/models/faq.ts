export class Faq {
  faq_seq: number;        // pk (자동입력)
  faq_nm: string;           // 문의사항
  content: string;          // 답변
  reg_user: string;         // 등록자 (화면등록X) : 서비스에서 로그인한사람 아이디 삽입 (다른 메뉴 서비스 참고)
  reg_dt: Date;             // 등록일 (화면등록X) : 서비스에서 현재날짜 삽입
  upd_user: string;        // 수정자 (화면등록X) : 서비스에서 로그인한사람 아이디 삽입 (다른 메뉴 서비스 참고)
  upd_dt: Date;            // 수정일 (화면등록X) : 서비스에서 현재날짜 삽입
}
