export class Coupon {
  coupon_seq: number;   // pk (자동입력)
  coupon_nm: string;      // 쿠폰명
  type: string;               // 쿠폰타입
  start_date: Date;         // 쿠폰시작일
  end_date: Date;          // 쿠폰종료일
  reg_dt: Date;             // 등록일 (화면등록X) : 서비스에서 현재날짜 삽입
  reg_user: string;         // 등록자 (화면등록X) : 서비스에서 로그인한사람 아이디 삽입 (다른 메뉴 서비스 참고)
  upd_dt: Date;            // 수정일 (화면등록X) : 서비스에서 현재날짜 삽입
  upd_user: string;        // 수정자 (화면등록X) : 서비스에서 로그인한사람 아이디 삽입 (다른 메뉴 서비스 참고)
  use_yn: number;         // (자동입력) : 삭제 시 데이터를 삭제하지말고 값을 0으로 변경 / 조회 시 use_yn이 1인 값만 보여주게 됨
}
