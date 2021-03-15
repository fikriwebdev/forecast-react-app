const Forecast = ({ forecast, isPending }) => {
  const { list } = forecast;

  return (
    <div>
      {!isPending && (
        <div className="forecast">
          {typeof list != "undefined" ? (
            <div>
              <div style={{ color: "white" }}>
                <h2>Today</h2>
              </div>
              <div className="forecast-card">
                {list.map((item, i) => {
                  if (i < 4) {
                    return (
                      <div className="container-card" key={item.dt}>
                        <div className="forecast-item">
                          <div className="time">
                            <h4>{item.dt_txt.slice(10).slice(0, 6)}</h4>
                          </div>
                          <div className="icon">
                            <img
                              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                              alt=""
                            />
                            <h5>{item.weather[0].main}</h5>
                          </div>
                          <div className="degree">
                            <h4>{Math.round(item.main.temp)}&deg;</h4>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return "";
                  }
                })}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      )}

      {isPending && (
        <div className="forecast">
          <div className="result">
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forecast;
