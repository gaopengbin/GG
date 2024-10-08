export { }

declare global {
    interface Window {
        _AMapSecurityConfig: any;
        map: any;
        AMap: any;
        autoComplete: any;
        driving: any;
        walking: any;
        transfer: any;
        riding: any;
        weather: any;
        weatherInfo: any;
        address: any;
        ePub: any;
        EPUBJS: any;
    }
}