using System.Web.Optimization;

namespace LoveStory.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                "~/Scripts/references/angular/angular.js",
                "~/Scripts/references/angular/angular-*"));

            bundles.Add(new ScriptBundle("~/bundles/ui-router").IncludeDirectory(
                "~/Scripts/references/angular.ui.router/", "*.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").IncludeDirectory(
                "~/Scripts/references/angular.ui.bootstrap/", "*.js"));

            bundles.Add(new ScriptBundle("~/bundles/paper").IncludeDirectory(
                "~/Scripts/references/paper/", "*.js"));

            bundles.Add(new ScriptBundle("~/bundles/app").IncludeDirectory(
                "~/Scripts/app/", "*.js", searchSubdirectories: true));

            bundles.Add(new StyleBundle("~/bundles/styles").IncludeDirectory(
                "~/Content/styles/", "*.css", searchSubdirectories: true));
        }
    }
}