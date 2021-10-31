package com.javaclimb.util.weixin;

public class SettingUtils {
    /**
     * 小程序唯一标识 (在微信小程序管理后台获取)
     */
    public static final String WX_APPID = "wx73f1770581a2b6d3";
    /**
     * 小程序的 app secret (在微信小程序管理后台获取)
     */
    public static final String WX_APPSECRET = "aecb3a95c440a2d2517fff55a7966d3e";
    /**
     * 授权类型-登录认证（必填）
     */
    public static final String GRANT_TYPE_AUTHORIZATION_CODE = "authorization_code";
    /**
     * 授权类型-access_token认证（必填）
     */
    public static final String GRANT_TYPE_ACCESS_TOKEN = "access_token";

    //微信支付--start
    public static final String MCH_ID = "1486565682";
    //商户支付密钥Key
    public static final String CODE_SUCCESS = "SUCCESS";//微信统一下单成功的code值
    public static final String CODE_FAIL = "FAIL";//微信统一下单成功的code值FAIL
    //微信支付--end

    //模板消息id
    public static final String TEMPLATE_COUPON_GOT_SUCCESS = "HDhnnxGDnlDmh48cHs1-rCDWelDq1ClgNo3dHs7CFTs";//领取成功
    public static final String TEMPLATE_COUPON_CONSUME_SUCCESS = "1CjVDoKDwfSKdFyu8fKn8v-FXvC7KX2SsI3-Xv_2swM";//使用成功
}
