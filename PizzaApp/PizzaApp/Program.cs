using PizzaApp.Helpers.DIContainer;
using PizzaApp.Helpers.Extensions;
using PizzaApp.Mappers.MapperConfig;

var builder = WebApplication.CreateBuilder(args);

//how to make object for saving the values from appsettings.json =>
var appSettings = builder.Configuration.GetSection("AppSettings");

#region using ServiceCollectionExtensions

//Bellow => So koristenje na extension metodite od serviceCollectionExtensions

builder.Configuration.AddEnvironmentVariables();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAutoMapper(typeof(AutoMapperProfile).Assembly)
                .AddPostgreSqlDbContext(appSettings)
                .AddAuthentication()
                .AddJwt(appSettings)
                .AddIdentity()
                .AddCors()
                .AddSwager();

DIHelper.InjectRepositories(builder.Services);
DIHelper.InjectServices(builder.Services);

#endregion

#region Everything written in program.cs

//Bellow => site metodi iskucani vo program.cs
//builder.Services.Configure<AppSettings>(appSettings);
//AppSettings appSettingsObject = appSettings.Get<AppSettings>();

//var connectionString = appSettingsObject.ConnectionString;

//setting db context with the connection string
//builder.Services.AddDbContext<PizzaAppDbContext>(option => 
//option.UseNpgsql(connectionString));

//adding identity nuget package 
//builder.Services.AddIdentityCore<User>(option =>
//{
//    option.SignIn.RequireConfirmedAccount = true;
//})
//    .AddEntityFrameworkStores<PizzaAppDbContext>()
//    .AddDefaultTokenProviders();


//builder.Services.AddControllers();
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();
//builder.Services.AddAutoMapper(typeof(AutoMapperProfile).Assembly); // refference to PizzaApp.Mappers
//settings for using authorisation in swagger =>
//builder.Services.AddSwaggerGen(c =>
//{
//    c.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme // using microsoft.openapi.models
//    {
//        Description = "Standard Authorisation header using the bearer scheme, e.g." +
//        "\bearer {token} \"",
//        In = ParameterLocation.Header,
//        Name = "Authorization",
//        Type = SecuritySchemeType.ApiKey
//    });
//    c.OperationFilter<SecurityRequirementsOperationFilter>(); // install swashbucke.aspnetcore.filters

//});

//builder.Services.AddAuthentication(option =>
//{
//    option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//    option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//    option.DefaultScheme = JwtBearerDefaults.AuthenticationScheme; // using Microsoft.AspNetCore.Authentication.JwtBearer;
//})
//    .AddJwtBearer(options =>
//    {
//        options.TokenValidationParameters = new TokenValidationParameters // using Microsoft.IdentityModel.Tokens;
//        {
//            ValidateIssuerSigningKey = true,
//            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value)),
//            ValidateIssuer = false,
//            ValidateAudience = false
//        }; 
//    });

//DIHelper.InjectRepositories(builder.Services);
//DIHelper.InjectServices(builder.Services);

#endregion


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
