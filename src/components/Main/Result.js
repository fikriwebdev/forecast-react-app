const Result = ({ weather, isPending }) => {
  const { name, main, sys } = weather;

  return (
    <div>
      {!isPending && (
        <div className="result">
          {typeof weather != "undefined" ? (
            <div>
              <div className="weather-now">
                {typeof main != "undefined" ? (
                  <div>
                    <span>&deg;</span>
                    <h4>{Math.round(main.temp)}</h4>
                  </div>
                ) : (
                  ""
                )}
              </div>

              {typeof sys != "undefined" ? (
                <div className="city">
                  <h3>
                    {name}, {sys.country}
                  </h3>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}

          {typeof weather.weather != "undefined" ? (
            <div className="weather-desc">
              <h1>{weather.weather[0].main}</h1>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
      {isPending && (
        <div className="result">
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
