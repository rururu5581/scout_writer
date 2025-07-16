
import React from 'react';

const MorichLogo: React.FC = () => (
  <img 
    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAAA8CAMAAAB/pGvAAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAaVBMVEX/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD////eAB7lAB/nACD/8fH2s7T5x8n96ur0qa/ys7P6zM/xubtAAAAAWnRSTlMAQOzS89iGNwIJA/ns0GAKEd/p5tZkEBnbmHEV054C34dZ892NTPf3u6Xl3b23paSm+cOqjYCAgH1sL/LNxL2hmIeBfn17e3x8PDs2Jj4CAgJ+Y+YAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH6AYbCB4V2s8fngAAArNJREFUeNrt3OtWG0UYh/FTSUSrIIsLgzu4I7io+79sQ0s3hTTVV+fC/R6Hk+TjS86bAQAAYBBY5TjD+zWd5+sLzV5t26pXt+30t91u39M0T6/b3rR5nt4H/v7z/f6D23K5XEvA8/m93+/f930/Aev5PF8g4Hk+XyDg6/t93w+A/f0BPgL29w/4CNjfP+AjYH//gI+A/f0DPgL29w/4CNjfP+AjYH//gI+A/f0DPgL29w/4CNjfP+AjYH//gI+A/f0DPgL29w/4CNjfP+AjYH//gI+A/f0DPgL29w/4CNjfP+AjYH//gI+A/f0DPgL29w/4CNjfP+AjYH//gI+A/f0DPgL29w/4CNjfP+AjYH//gI+A/f0DPgL29w/4CNjfP+AjYH//gI+A/f0DPgL29w/4COyF/t/vF8kRz0f+eL9IjuJ8yHj9Ipni8R5kvP4cmeLxHmS8/hyZ4vEeZLz+HJEc4vGQ8fpzZIjHeZDxyrNkj8d7kPHKs2SPx3uQ8cqzZI/He5DxyrNkj8d7kPHKs2SPx3uQ8cqzZI/He5DxyrNkj8d7kPHKs2SPx3uQ8cqzZI/He5DxyrNkj8d7kPHKs2SPlz+Q8cqzZI+XHx/yrNk7+MHyB0POGj2Cj1c+mHJW6C18/eRHyllh8PHVnyhnhcHHV3+inBUOH1/9iXJWOHx89SfKWWHw8dWfKGeFwcdXf6KcFPY+vvrzMylnhT1P79U/M5M8T4G/H18kH1PeBv4Afb7+gZ43AUB7YJ8vE/B8ni8Q8Hy/r/sB8L6/xwvwnr/HC/Cev8cL8J6/xwvwnr/HC/Cev8cL8J6/xwvwnr/HC/Cev8cL8J6/xwvwnr/HC/Cev8cL8J6/xwvwnr/HC/Cev8cL8J6/xwvwnr/HC/Cev8cL8J6/xwvwnr/HC/Cev8cL8J6/xwvwnr/HC/Cev8cL8J6/xwvwnr/HC/Cev8cL8J6/xwvwnr/HC/Cev8cL8J6/xwvwnr/HC/Cev8cL8J6/xwvwnr/HC/Cev8cL8J6/xwvwnr/HC/Cev8cL8J6/xwvwnr/HC/Cev8cL8J6/xwvwnr/HC/Cev8cL8L7f9/2AXq/X7Wq1v6Zpnlq2vWnLtlarDQAAMAgM8xuM8093k0k05wAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyNC0wNi0yN1QwODozMDoyMSswMDowMPm7g+UAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjQtMDYtMjdUMDg6MzA6MjErMDA6MDCz+wOaAAAAAElFTkSuQmCC"
    alt="morich logo" 
    className="h-10 md:h-12 w-auto"
  />
);

const Header: React.FC = () => {
  return (
    <header className="flex flex-col sm:flex-row items-center justify-between mb-8 pb-4 border-b-2 border-gray-200">
      <div className="flex items-center space-x-4">
        <MorichLogo />
        <h1 className="text-2xl sm:text-3xl font-bold text-morich-red tracking-tight">
          scout writer
        </h1>
      </div>
      <p className="text-sm text-gray-600 mt-2 sm:mt-0">by Top Consultant AI</p>
    </header>
  );
};

export default Header;
